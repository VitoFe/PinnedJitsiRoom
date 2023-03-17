let currentTabId;
let tabId;
let previousTab;

function onError(error) {
  console.error(`Error occurred: ${error.message}`);
}

function setButtonIcon(imageURL) {
  try {
    browser.browserAction.setIcon({path: imageURL});
  } catch (e) {
    onError(e);
  }
}

async function setTabFavicon(tid, href) {
  const script = `
    let link = document.querySelector("link[rel=icon]")
    if (!link) {
      link = document.createElement("link")
      document.head.appendChild(link)
    }
    link.type = "image/png"
    link.rel = "icon"
    link.href = '${href}'
  `;
  await browser.tabs.executeScript(tid, { code: script });
}

async function createPinnedTab() {
  try {
    let { roomName } = await browser.storage.local.get('roomName');
    roomName = roomName || '';
    let tab = await browser.tabs.create({
      url: "https://meet.jit.si/" + roomName,
      pinned: true,
      active: true
    });
    tabId = tab.id;
    let { faviconOption } = await browser.storage.local.get('faviconOption');
    if (faviconOption === "addon") {
      const imageUrl = browser.runtime.getURL("icons/icon-64.png");
      await setTabFavicon(tabId, imageUrl);
    }
  } catch (error) {
    console.error(error);
  }
}

// Hhandle the search for existing tabs with the specified URL
async function handleSearch(customTabs) {
  if (customTabs.length > 0) {
    tabId = customTabs[0].id;
    let { faviconOption } = await browser.storage.local.get('faviconOption');
    if (faviconOption === "website") {
      setButtonIcon(customTabs[0].favIconUrl);
    }
  } else {
    await createPinnedTab();
  }

  if (tabId === currentTabId) {
    browser.tabs.update(previousTab, { active: true });
  } else {
    previousTab = currentTabId;
    browser.tabs.update(tabId, { active: true });
  }
}

async function handleClick(tab) {
  currentTabId = tab.id;
  try {
    // Get the room name from storage or use an empty string if it's not set
    const result = await browser.storage.local.get('roomName');
    let roomName = result.roomName || '';
    // Search for existing tabs with the specified URL
    const customTabs = await browser.tabs.query({url: `*://meet.jit.si/${roomName}*`});
    await handleSearch(customTabs);
  } catch (error) {
    onError(error);
  }
}


// Handle options page
function update(details) {
  if (details.reason === "install" || details.reason === "update") {
    browser.runtime.openOptionsPage();
  }
}

browser.browserAction.onClicked.addListener(async (tab) => {
  await handleClick(tab);
});
browser.runtime.onInstalled.addListener(update);

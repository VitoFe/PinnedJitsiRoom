# Pinned Jitsi Room 📌
Firefox addon that creates a pinned tab for a Jitsi room, allowing to quickly switch to the tab whenever you need to access the room.
To use this add-on, you must have Firefox installed.

### Installing an official release 📥

- Download the extension from the [official public listing](https://addons.mozilla.org/en-US/firefox/addon/pinned-jitsi-room/) or grab the latest compiled addon from the Releases page and drag-and-drop it onto Firefox

### Installing a dev version (only temporary) 🧑‍💻

- Clone or download the repository
- Execute the `makexpi.sh` bash script (on linux) or zip the contents of the repository and rename the zipped file extension to `.xpi` (on any system)
- Open Firefox and navigate to `about:debugging`
- Click on the "This Firefox" menu item and select "Load Temporary Add-on"
- Navigate to the `.xpi` file created earlier and select it
- The add-on is now installed and should appear in the Firefox toolbar

### How to use 🤔

- First of all, configure the add-on as needed, from the Add-ons options (read Options section)
- Click on the add-on button in the Firefox toolbar
- The add-on will create a pinned tab to a Jitsi Meet room
- The favicon of the tab will be set according to the user's preference (either the add-on's icon or the website's favicon)
- If a tab with the same Jitsi Meet room name already exists, it will be activated instead of creating a new one

### Options ⚙️

To change the Jitsi Meet room name and the icon style, go to the options page:
- Click on the three horizontal lines in the Firefox toolbar
- Click on "Add-ons"
- Find the "Jitsi Meet Pinned Tab" add-on and click on the "Options" button
- Update the room name and the icon style as needed

### Contributing 🤝

If you find any bugs or have any suggestions for improvements, please open an issue and write in detail. Pull requests are also welcome.

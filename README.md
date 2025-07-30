# Set Replace - Obsidian Plugin

An Obsidian plugin that allows you to replace predefined characters or strings with other characters or strings throughout your notes.

## Features

- **Character/String Replacement**: Configure multiple character or string mappings that can be replaced with a single command
- **Configurable Mappings**: Add, edit, and remove character mappings through the plugin settings
- **Flexible**: Works with single characters, multi-character strings, or even special characters
- **Easy to Use**: Simply run the "Replace predefined characters" command from the command palette

## How to Use

### Setting Up Character Mappings

1. Go to **Settings** → **Community Plugins** → **Set Replace**
2. In the settings panel, you'll see a list of character mappings
3. For each mapping:
   - **From**: Enter the character(s) or string you want to replace
   - **To**: Enter the replacement character(s) or string
4. Click **Add** to create new mappings
5. Click **Delete** to remove unwanted mappings (at least one mapping must remain)

### Replacing Characters

1. Open the note where you want to replace characters
2. Open the Command Palette (`Ctrl/Cmd + P`)
3. Search for and run **"Replace predefined characters"**
4. The plugin will replace all instances of your configured "from" strings with their "to" replacements
5. You'll see a notice showing how many replacements were made

## Examples

Here are some example use cases:

- **Smart Quotes**: Replace straight quotes (`"`) with curly quotes (`"` and `"`)
- **Dashes**: Replace double hyphens (`--`) with em dashes (`—`)
- **Special Characters**: Replace `(c)` with `©` or `(tm)` with `™`
- **Language Characters**: Replace ASCII characters with accented characters
- **Abbreviations**: Replace common abbreviations with full words

## Installation

### From Obsidian Community Plugins (Recommended)
*Coming soon - this plugin is not yet available in the community plugin directory*

### Manual Installation
1. Download the latest release from GitHub
2. Extract the `main.js`, `manifest.json`, and `styles.css` files
3. Create a folder named `set-replace` in your `.obsidian/plugins/` directory
4. Place the extracted files in the `set-replace` folder
5. Reload Obsidian and enable the plugin in Settings → Community Plugins

## Development

This plugin is built with TypeScript and uses the Obsidian Plugin API.

### Building from Source
```bash
# Clone the repository
git clone https://github.com/dryezl/obsidian-set-replace.git
cd obsidian-set-replace

# Install dependencies
npm install

# Build the plugin
npm run build

# For development with auto-rebuild
npm run dev
```

## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

## License

MIT License - see [LICENSE](LICENSE) for details.

## Support

If you find this plugin helpful, consider supporting its development!
- `npm i` or `yarn` to install dependencies.
- `npm run dev` to start compilation in watch mode.

## Manually installing the plugin

- Copy over `main.js`, `styles.css`, `manifest.json` to your vault `VaultFolder/.obsidian/plugins/your-plugin-id/`.

## Improve code quality with eslint (optional)
- [ESLint](https://eslint.org/) is a tool that analyzes your code to quickly find problems. You can run ESLint against your plugin to find common bugs and ways to improve your code. 
- To use eslint with this project, make sure to install eslint from terminal:
  - `npm install -g eslint`
- To use eslint to analyze this project use this command:
  - `eslint main.ts`
  - eslint will then create a report with suggestions for code improvement by file and line number.
- If your source code is in a folder, such as `src`, you can use eslint with this command to analyze all files in that folder:
  - `eslint .\src\`

## Funding URL

You can include funding URLs where people who use your plugin can financially support it.

The simple way is to set the `fundingUrl` field to your link in your `manifest.json` file:

```json
{
    "fundingUrl": "https://buymeacoffee.com"
}
```

If you have multiple URLs, you can also do:

```json
{
    "fundingUrl": {
        "Buy Me a Coffee": "https://buymeacoffee.com",
        "GitHub Sponsor": "https://github.com/sponsors",
        "Patreon": "https://www.patreon.com/"
    }
}
```

## API Documentation

See https://github.com/obsidianmd/obsidian-api

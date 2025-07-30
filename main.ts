import { App, Editor, MarkdownView, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';

interface CharacterMapping {
	from: string;
	to: string;
}

interface SetReplaceSettings {
	characterMappings: CharacterMapping[];
}

const DEFAULT_SETTINGS: SetReplaceSettings = {
	characterMappings: [
		{ from: '', to: '' }
	]
}

export default class SetReplacePlugin extends Plugin {
	settings: SetReplaceSettings;

	async onload() {
		await this.loadSettings();

		// Add command to replace characters in the current editor
		this.addCommand({
			id: 'replace-characters',
			name: 'Replace predefined characters',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				this.replaceCharacters(editor);
			}
		});

		// This adds a settings tab so the user can configure character mappings
		this.addSettingTab(new SetReplaceSettingTab(this.app, this));
	}

	replaceCharacters(editor: Editor) {
		const content = editor.getValue();
		let newContent = content;
		let replacementCount = 0;

		this.settings.characterMappings.forEach(mapping => {
			if (mapping.from && mapping.to) {
				const regex = new RegExp(this.escapeRegExp(mapping.from), 'g');
				const matches = newContent.match(regex);
				if (matches) {
					replacementCount += matches.length;
					newContent = newContent.replace(regex, mapping.to);
				}
			}
		});

		if (replacementCount > 0) {
			editor.setValue(newContent);
			new Notice(`Replaced ${replacementCount} character(s)`);
		} else {
			new Notice('No characters found to replace');
		}
	}

	escapeRegExp(string: string): string {
		return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	}

	onunload() {
		// Clean up if needed
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class SetReplaceSettingTab extends PluginSettingTab {
	plugin: SetReplacePlugin;

	constructor(app: App, plugin: SetReplacePlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		containerEl.createEl('h2', { text: 'Character Replacement Settings' });

		containerEl.createEl('p', {
			text: 'Configure character mappings. Each row defines a character or string to be replaced with another character or string.'
		});

		// Add button to add new mapping
		new Setting(containerEl)
			.setName('Add new mapping')
			.setDesc('Add a new character replacement mapping')
			.addButton(button => button
				.setButtonText('Add')
				.setCta()
				.onClick(() => {
					this.plugin.settings.characterMappings.push({ from: '', to: '' });
					this.plugin.saveSettings();
					this.display(); // Refresh the display
				}));

		// Display existing mappings
		this.plugin.settings.characterMappings.forEach((mapping, index) => {
			const setting = new Setting(containerEl)
				.setName(`Mapping ${index + 1}`)
				.setDesc('Replace "from" with "to"');

			setting.addText(text => text
				.setPlaceholder('Character(s) to replace')
				.setValue(mapping.from)
				.onChange(async (value) => {
					this.plugin.settings.characterMappings[index].from = value;
					await this.plugin.saveSettings();
				}));

			setting.addText(text => text
				.setPlaceholder('Replacement character(s)')
				.setValue(mapping.to)
				.onChange(async (value) => {
					this.plugin.settings.characterMappings[index].to = value;
					await this.plugin.saveSettings();
				}));

			// Add delete button for this mapping (but keep at least one)
			if (this.plugin.settings.characterMappings.length > 1) {
				setting.addButton(button => button
					.setButtonText('Delete')
					.setWarning()
					.onClick(() => {
						this.plugin.settings.characterMappings.splice(index, 1);
						this.plugin.saveSettings();
						this.display(); // Refresh the display
					}));
			}
		});
	}
}

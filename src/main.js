
const OBSIDIAN = "obsidian"; /* force dynamic evaluation */
const { Plugin, ItemView, MarkdownRenderer } = require(OBSIDIAN);

require('./view.js');

const VIEW_TYPE_READER = "alternative-reading-view";

module.exports = class AlternativeReadingViewPlugin extends Plugin {
    async onload() {
        this.registerView(
            VIEW_TYPE_READER,
            (leaf) => new AlternativeReadingView(leaf, this.app)
        );

        this.addRibbonIcon("book-check", "Open Obsidious view", () => {
            this.activateView();
        });
    }

    async activateView() {
        const { workspace } = this.app;

        // Check if view already exists
        const existingLeaf = workspace.getLeavesOfType(VIEW_TYPE_READER)[0];

        if (existingLeaf) {
            workspace.revealLeaf(existingLeaf);
            return;
        }

        // Otherwise create a new one
        const leaf = workspace.getRightLeaf(false);
        if (!leaf) return;

        await leaf.setViewState({
            type: VIEW_TYPE_READER,
            active: true,
        });

        workspace.revealLeaf(leaf);
    }
};

class AlternativeReadingView extends ItemView {
    constructor(leaf, app) {
        super(leaf);
        this.app = app;
    }

    getViewType() {
        return VIEW_TYPE_READER;
    }

    getDisplayText() {
        return "Obsidious";
    }

    getIcon() {
        return "book-check";
    }

    async onOpen() {
        this.containerEl.empty();
        this.containerEl.addClass("obsidious-container");

        const activeFile = this.app.workspace.getActiveFile();
        if (activeFile) {
            await this.renderFile(activeFile);
        }

        this.registerEvent(
            this.app.workspace.on("active-leaf-change", async () => {
                const file = this.app.workspace.getActiveFile();
                if (file) await this.renderFile(file);
            })
        );

        this.registerEvent(
            this.app.vault.on("modify", async (file) => {
                const activeFile = this.app.workspace.getActiveFile();
                if (activeFile && file === activeFile) {
                    await this.renderFile(file);
                }
            })
        );
    }

    async renderFile(file) {
        // const content = await this.app.vault.read(file);

        if (this.containerEl.children.length === 0) {
            this.containerEl.appendChild(document.createElement('obsidious-view'));
        }
    }

    async onClose() {
        this.containerEl.empty();
    }
}

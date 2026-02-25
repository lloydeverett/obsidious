
const OBSIDIAN = "obsidian"; /* force dynamic evaluation */
const { Plugin, ItemView, normalizePath } = require(OBSIDIAN);

const frameSrcTemplate = require('bundle-text:./frame.html');

const VIEW_TYPE_OBSIDIOUS = "obsidious-view";

module.exports = class ObsidiousPlugin extends Plugin {
    async onload() {
        this.registerView(
            VIEW_TYPE_OBSIDIOUS,
            (leaf) => new ObsidiousView(leaf, this.app, this)
        );

        this.addCommand({
            id: 'open-obsidious-split',
            name: 'Open Obsidious view for the current file',
            callback: () => {
                this.activateView(false);
            },
        });

        this.addCommand({
            id: 'open-obsidious-right',
            name: 'Show Obsidious',
            callback: () => {
                this.activateView(true);
            },
        });
    }

    async activateView(onRightLeaf) {
        const { workspace } = this.app;

        let leaf;
        if (onRightLeaf) {
            // Check if view already exists
            const existingLeaves = workspace.getLeavesOfType(VIEW_TYPE_OBSIDIOUS);
            for (const leaf of existingLeaves) {
                if (leaf.getRoot().side === "right") {
                    workspace.revealLeaf(leaf);
                    return;
                }
            }

            // It's not there, so create it
            leaf = workspace.getRightLeaf(false);
            if (!leaf) return;
            await leaf.setViewState({
                type: VIEW_TYPE_OBSIDIOUS,
                active: true,
            });
        } else {
            leaf = this.app.workspace.splitActiveLeaf()
            if (!leaf) return;
            await leaf.setViewState({
                type: VIEW_TYPE_OBSIDIOUS,
                active: false,
            });
        }

        workspace.revealLeaf(leaf);
    }
};

class ObsidiousView extends ItemView {
    constructor(leaf, app, plugin) {
        super(leaf);
        this.app = app;
        this.plugin = plugin;
    }

    getViewType() {
        return VIEW_TYPE_OBSIDIOUS;
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

        const url = new URL(this.app.vault.adapter.getResourcePath(normalizePath(this.plugin.manifest.dir)));
        url.search = '';

        const frameSrc = frameSrcTemplate.replace(
                             "__FRAME_BASE_HREF__",
                             url.href + '/');

        if (this.containerEl.children.length === 0) {
            const iframe = document.createElement('iframe')
            iframe.style.width = "100%";
            iframe.style.height = "100%";
            iframe.style.margin = 0;
            iframe.style.padding = 0;
            iframe.srcdoc = frameSrc;
            this.containerEl.appendChild(iframe);
        }
    }

    async onClose() {
        this.containerEl.empty();
    }
}

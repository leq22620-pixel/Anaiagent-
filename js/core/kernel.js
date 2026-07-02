/**
 * ==========================================
 * AnOS Kernel
 * Version : 0.0.1 Alpha
 * Author  : Bạn + ChatGPT
 * ==========================================
 */

class Kernel {

    constructor() {

        this.version = "0.0.1";

        this.name = "AnOS";

        this.status = "STOP";

        this.modules = [];

    }

    async boot() {

        console.log("================================");

        console.log("AnOS Booting...");

        console.log("Version :", this.version);

        console.log("================================");

        this.status = "BOOTING";

        await this.loadModules();

        this.status = "READY";

        console.log("Kernel Ready.");

    }

    async loadModules() {

        console.log("Loading Modules...");

        this.modules = [

            "AI",

            "Database",

            "Memory",

            "Workflow"

        ];

        this.modules.forEach(module => {

            console.log("✓", module);

        });

    }

    info() {

        return {

            name: this.name,

            version: this.version,

            status: this.status,

            modules: this.modules

        };

    }

}

const kernel = new Kernel();

export default kernel;
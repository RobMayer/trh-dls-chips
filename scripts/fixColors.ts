import fs from "fs/promises";

type Colour = {
    r: number;
    g: number;
    b: number;
    a: number;
};

const COLORS_BY_COLLECTION: { targets: string[]; colour: Colour }[] = [
    {
        targets: ["GATES", "GATES+", "GATES++"],
        colour: {
            r: 0.73,
            g: 0.26,
            b: 0.26,
            a: 1,
        },
    },
    {
        targets: ["LOGIC", "LOGIC+"],
        colour: {
            r: 0.259999961,
            g: 0.435298175,
            b: 0.73,
            a: 1,
        },
    },
    {
        targets: ["MATH"],
        colour: {
            r: 0.299200684,
            g: 0.773722231,
            b: 0.409366429,
            a: 1,
        },
    },
    {
        targets: ["STATE", "STATE+"],
        colour: {
            r: 0.1753349,
            g: 0.5609566,
            b: 0.6993928,
            a: 1,
        },
    },
    {
        targets: ["COMMS"],
        colour: {
            r: 0.08925677,
            g: 0.38920933,
            b: 0.0163614061,
            a: 1,
        },
    },
    {
        targets: ["I/O"],
        colour: {
            r: 0.672363043,
            g: 0.5310183,
            b: 0.4243802,
            a: 1,
        },
    },
    {
        targets: ["CTRL"],
        colour: {
            r: 0.7942815,
            g: 0.7942815,
            b: 0.7942815,
            a: 1,
        },
    },
];

type ProjectDescription = {
    ChipCollections: {
        Chips: string[];
        IsToggleOpen: boolean;
        Name: string;
    }[];
};

type Chip = {
    Colour: Colour;
};

const loadProjectDescription = async (): Promise<ProjectDescription> => {
    const file = await fs.readFile("./ProjectDescription.json", "utf8");
    return JSON.parse(file);
};

const loadChip = async (chipName: string): Promise<Chip> => {
    const file = await fs.readFile(`./Chips/${chipName}.json`, "utf8");
    return JSON.parse(file);
};

const saveChip = async (chipName: string, data: any) => {
    const toPut = JSON.stringify(data);
    await fs.writeFile(`./Chips/${chipName}.json`, toPut, "utf8");
};

const BUILTIN_CHIPS = ["NAND"];

const main = async () => {
    const project = await loadProjectDescription();

    await Promise.all(
        COLORS_BY_COLLECTION.map(async ({ targets, colour }) => {
            const chipsToChange: string[] = [];

            project.ChipCollections.forEach((col) => {
                if (targets.includes(col.Name)) {
                    chipsToChange.push(...col.Chips);
                }
            });

            await Promise.all(
                chipsToChange.map(async (chipName) => {
                    try {
                        const chip = await loadChip(chipName);
                        chip.Colour = colour;
                        await saveChip(chipName, chip);
                    } catch (e) {
                        console.error(`${chipName} is invalid - probably builtin`);
                    }
                })
            );
        })
    );
};

main()
    .then(() => {
        console.log("done!");
    })
    .catch((e) => {
        console.error(e);
    });

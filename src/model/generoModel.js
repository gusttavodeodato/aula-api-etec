import { EntitySchema } from "typeorm";

const genero = new EntitySchema ({
    name: "genero",
    tableName: "tb_generos",
    columns: {
        id: {primary: true, type: "int", generated: "increment"},
        name_genero: {type: "varchar", length: 60, nullable: false},
        created_at: {type: "date", default: () => "CURRENT_TIMESTAMP", nullable: false},
        deleted_at: {type: "date", nullable: true}
    }
});

export default genero;
import { EntitySchema } from "typeorm";

const actor = new EntitySchema ({
    name: "actor",
    tableName: "tb_actors",
    columns: {
        id: {primary: true, type: "int", generated: "increment"},
        name: {type: "varchar", length: 60, nullable: false},
        sex: {type: "enum", enum: ['M', 'F'], nullable: false},
        date_nasc: {type: "date", nullable: false},
        nacionality: {type: "varchar", length: 50, nullable: false},
        photo_actor: {type: "varchar", length: 80, nullable: true},
        created_at: {type: "date", default: () => "CURRENT_TIMESTAMP", nullable: false},
        deleted_at: {type: "date", nullable: true}
    }
});

export default actor;
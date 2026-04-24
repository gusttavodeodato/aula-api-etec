import { EntitySchema } from "typeorm";

const director = new EntitySchema ({
    name: "director",
    tableName: "tb_directors",
    columns: {
        id: {primary: true, type: "int", generated: "increment"},
        name: {type: "varchar", length: 60, nullable: false},
        sex: {type: "enum", enum: ['M', 'F'], nullable: false},
        date_nasc: {type: "date", nullable: false},
        nacionality: {type: "varchar", length: 50, nullable: false},
        photo_director: {type: "varchar", length: 80, nullable: true,},
        created_at: {type: "date", default: () => "CURRENT_TIMESTAMP", nullable: false},
        deleted_at: {type: "date", nullable: true}
    }
});

export default director;
import { EntitySchema } from "typeorm";

const user = new EntitySchema ({
    name: "user",
    tableName: "user", // nome da tabela
    columns: { // colunas
        id: {primary: true, type: "int", generated: "increment"},
        name: {type: "varchar", length: 80, nullable: false},
        email: {type: "varchar", length: 50, nullable: false, unique: true},
        password: {type: "varchar", length: 20, nullable: false},
        typeUser: {type: "enum", enum:["admin", "comum"], nullable: false},
        createdAt: {type: "date", default: () => "CURRENT_TIMESTAMP", nullable: false},
        deletedAt: {type: "date", nullable: true}
    }
}); 

export default user;
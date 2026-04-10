import { EntitySchema } from "typeorm";

const premiacao = new EntitySchema ({
    name: "premiacao",
    tableName: "tb_premiacoes",
    columns: {
        id: {primary: true, type: "int", generated: "increment"},
        name_premiacao: {type: "varchar", length: 30, nullable: false},
        valor_premio: {type: "decimal", nullable: false},
        created_at: {type: "date", default: () => "CURRENT_TIMESTAMP", nullable: false},
        deleted_at: {type: "date", nullable: true}
    }
});

export default premiacao;
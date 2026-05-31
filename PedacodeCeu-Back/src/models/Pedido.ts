import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import Usuario from "./Usuario";

class Pedido extends Model {
  declare id: string;
  declare usuarioId: string;
  declare status: "pendente" | "confirmado" | "entregue" | "cancelado";
  declare total: number;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Pedido.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    usuarioId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "usuarios",
        key: "id",
      },
    },
    status: {
      type: DataTypes.ENUM("pendente", "confirmado", "entregue", "cancelado"),
      defaultValue: "pendente",
      allowNull: false,
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: "pedidos",
  }
);

Pedido.belongsTo(Usuario, { foreignKey: "usuarioId", as: "usuario" });
Usuario.hasMany(Pedido, { foreignKey: "usuarioId", as: "pedidos" });

export default Pedido;
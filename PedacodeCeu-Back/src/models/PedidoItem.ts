import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import Pedido from "./Pedido";
import Produto from "./Produto";

class PedidoItem extends Model {
  declare id: string;
  declare pedidoId: string;
  declare produtoId: string;
  declare quantidade: number;
  declare precoUnitario: number;
}

PedidoItem.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    pedidoId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "pedidos",
        key: "id",
      },
    },
    produtoId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "produtos",
        key: "id",
      },
    },
    quantidade: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    precoUnitario: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "pedido_itens",
    timestamps: false,
  }
);

PedidoItem.belongsTo(Pedido, { foreignKey: "pedidoId" });
PedidoItem.belongsTo(Produto, { foreignKey: "produtoId", as: "produto" });
Pedido.hasMany(PedidoItem, { foreignKey: "pedidoId", as: "itens" });

export default PedidoItem;
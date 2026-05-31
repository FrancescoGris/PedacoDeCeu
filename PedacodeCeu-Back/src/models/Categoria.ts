import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Categoria extends Model {
 declare id: string;
  declare nome: string;
}

Categoria.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "categorias",
    timestamps: false,
  }
);

export default Categoria;
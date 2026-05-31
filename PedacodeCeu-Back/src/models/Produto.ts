import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import Categoria from "./Categoria";

class Produto extends Model {
  declare id: string;
  declare nome: string;
  declare descricao: string;
  declare preco: number;
  declare imagem: string | null;
  declare destaque: boolean;
  declare ativo: boolean;
  declare categoriaId: string;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Produto.init(
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
    descricao: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    preco: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    imagem: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    destaque: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    categoriaId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "categorias",
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "produtos",
  }
);

Produto.belongsTo(Categoria, { foreignKey: "categoriaId", as: "categoria" });
Categoria.hasMany(Produto, { foreignKey: "categoriaId", as: "produtos" });

export default Produto;
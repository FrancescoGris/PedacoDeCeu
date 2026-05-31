import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Usuario extends Model {
  declare id: string;
  declare nome: string;
  declare email: string;
  declare senha: string;
  declare cpf: string;
  declare role: "usuario" | "admin";
  declare createdAt: Date;
  declare updatedAt: Date;
}

Usuario.init(
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    role: {
      type: DataTypes.ENUM("usuario", "admin"),
      defaultValue: "usuario",
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "usuarios",
  }
);

export default Usuario;
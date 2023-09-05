type PlayerType = "NOOBIE" | "CHEATER" | "CHAMP";

export class Player {
  name: string;
  type: PlayerType;

  constructor(name: string, type: PlayerType) {
    this.name = name.toLocaleUpperCase();
    this.type = type;
  }
}

export const cheaterPlayer = new Player(null, "CHEATER");

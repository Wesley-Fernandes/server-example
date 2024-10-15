import bcrypt from 'bcrypt';

class Criptografy {
  private static saltRounds = 10;

  /**
   * Classe para criptografar senhas e validar com bcrypt.
   */
  public static async encryptPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  /**
   * Classe para comparar senhas e validar se as senhas conferem.
   */
  public static async comparePasswords(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}

export default Criptografy;

import database from './database';

export class Auth {
  async register(email: string, password: string, name: string) {
    return await database.user.create({
      data: {
        email,
        password,
        name,
      },
    });
  }

  async find(email: string) {
    return await database.user.findUnique({
      where: {
        email,
      },
    });
  }

  async get(id:string){
    return await database.user.findUnique({
      where:{id},
      include:{
        books: {
          select:{
            title: true,
            thumbnail: true,
            categories:{
              select: {
                title: true
              }
            }
          }
        }
      }
    })
  }

  async list(){
    return await database.user.findMany({
      select:{
        id: true,
        name: true,
        adult: true,
        picture: true,
        thumbnail: true
      }
    })
  }
}

import {Hero} from './hero';

export class HeroesApi {
  private heroesList: Hero[] = [
    {
      id: 1,
      name: 'Супермен',
      power: 8,
      age: 25,
    },
    {
      id: 2,
      name: 'Бетмен',
      power: 5,
      age: 35,
    },
    {
      id: 3,
      name: 'Тор',
      power: 8,
      age: 1500,
    },
    {
      id: 4,
      name: 'Железный человек',
      power: 5,
      age: 35,
    },
    {
      id: 5,
      name: 'Человек-паук',
      power: 7,
      age: 15,
    },
    {
      id: 6,
      name: 'Алая ведьма',
      power: 9,
      age: 30,
    },
    {
      id: 7,
      name: 'Доктор Стрендж',
      power: 8,
      age: 42,
    },
    {
      id: 8,
      name: 'Локи',
      power: 7,
      age: 1053,
    },
    {
      id: 9,
      name: 'Капитан америка',
      power: 5,
      age: 104,
    },
    {
      id: 10,
      name: 'халк',
      power: 8,
      age: 46,
    },
  ];

  private availableList = [...this.heroesList];

  public getNewHero(): Hero | undefined {
    return this.availableList.pop();
  }

  public refreshHero(id: number): void{
    const refreshHero = this.heroesList.find(hero => hero.id === id);
    if (refreshHero) {
      this.availableList.push(refreshHero);
    }
  }

  public clearList(): void {
    this.availableList = [...this.heroesList];
  }
}

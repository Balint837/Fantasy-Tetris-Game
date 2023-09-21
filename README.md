# Fantasy-Tetris-Game

### [Figma link](https://www.figma.com/file/TiPvQaxbnc5RITrKLAVvXe/UwU?type=design&node-id=8-90&mode=design&t=DaoWSH9sbgnJqVdP-0)

**A játék célja:** Építsd a fantázia birodalmad és kerekedj felül az ellenfeleden.

**Előkészületek:**
- Válasszuk ki a játékpálya nagyságát.

**Játékmenet:** A játékosok felváltva lépnek.

**Egy játékos köre:**
- Húz két kártyát
- Választ egy kártyát
- Behelyezi a játéktáblára a tetris alakzatot, ami a kártyán van
- Végrehajtja a bónusz akciókat, ha van
- Következő játékos jön

**Kártya tartalma:**
- Egy tetris alakzat
- Minden egyes négyzetnek van saját fajtája (kép/alakzat)
- Egy különleges effekt, amely használható a sikeres lehelyezéskor (Nézd meg a “Lehelyezés szabályai”-t)
- A lehelyezés sikeres ha a tetris alakzat rá-helyezhető a táblára

**Lehelyezés szabályai:**
- Az elhelyezett alakzat nem lóghat ki a pályáról
- Nem rakhatjuk olyan helyre, ami már el van foglalva
- Ha nem tudjuk lerakni egyik kártyán lévő elemet se, akkor passzolnunk kell.

**Játék vége:** A játéknak akkor van vége, ha mind a két játékos egymás után kétszer passzol.

**Pontozás:**
- Minden terület 1 pont
- Extra pontok:
    - Fa: 1
    - Sárkány: 1
    - Kastély: 1
    - Barlang: 1
    - Dungeon: 1
    - Zeppelin: 1
    - Kikötő: 1
    - Liliom: 3
    - Hajó: 0
- Feltételes pontok:
    - Zeppelin lyuk felett: +2
    - Zeppelin víz felett: +1
    - Sárkány barlang mellett: +2
    - Kikötő víz mellett: +2
    - Kastély az ellenféllel érintkezik: +1
    - Fa víz mellett: +1
    - Hajó vízen: +3


**Egyéb:**
- Rétegek:
    - Tile réteg
    - Szín réteg
    - Akadály réteg
    - Ikon réteg
- Lyuk
    - Csak lebegő elemeket lehet rá helyezni
    - Lehelyezhető akadályként
- Repedés
    - Néhány kör után lyukká alakul (ha nincs elfoglalva)
- Víz
    - Vízen úszó elemek helyezhetők rá (lilypad, hajó)
- Kard
    - Felszabadítja a mezőt ahol le lett helyezve
    - Ha van rajta objektum akkor először leszedi


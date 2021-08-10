import classes from './MainSection.module.css';

const MainSection = () => {
  return (
    <div className={classes.container}>
      Sekcja glowna
      <ul>
        <li>gra glowna</li>
        <li>Liczenie ruchow // byc moze bedzie nagroda 3 gwiazdek</li>
        <li>button graj</li>
        <li>button undo</li>
        <li>button od nowa</li>
        <li>podanie nazwy gracza</li>
      </ul>
    </div>
  )
};

export default MainSection;
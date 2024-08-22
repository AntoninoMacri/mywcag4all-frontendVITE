export default function Price(props) {
  const priceString = (
    <>
      {props.price === "free" ? <p>Gratuito</p> : <p>Con opzioni a pagamento</p>}
    </>
  );

  return <>{priceString}</>;
}

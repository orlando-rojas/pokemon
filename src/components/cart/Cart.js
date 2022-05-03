import { Button, Typography } from '@mui/material';
import { useAppContext } from '../app';
import { CartFooter, CartItem, CartWrapper, ItemsWrapper } from './Cart.styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export function Cart() {
  const {
    cartPokemons,
    setCartPokemons,
    setMyPokemons,
    myPokemons,
    checkoutStep,
    setChechoutStep,
  } = useAppContext();

  const finishCheckout = () => {
    setMyPokemons([...myPokemons, ...cartPokemons]);
    setCartPokemons([]);
    setChechoutStep(1);
  };

  const handleCheckoutStepChange = () => {
    if (checkoutStep < 3) {
      setChechoutStep((prev) => prev + 1);
    } else {
      finishCheckout();
    }
  };

  return (
    <CartWrapper>
      {checkoutStep === 1 && (
        <>
          <ItemsWrapper>
            <Typography variant="h4">Summary</Typography>
            {cartPokemons.map((pokemon) => (
              <CartItem key={pokemon.id + pokemon.name + Date.now()}>
                <img src={pokemon.sprites.front_default} alt="" />
                <h1>{pokemon.name}</h1>
              </CartItem>
            ))}
          </ItemsWrapper>
          <CartFooter>
            <Button
              variant="contained"
              onClick={handleCheckoutStepChange}
              disabled={cartPokemons.length === 0}
            >
              Checkout
            </Button>
            <Button
              variant="contained"
              onClick={() => setCartPokemons([])}
              disabled={cartPokemons.length === 0}
            >
              Clear
            </Button>
          </CartFooter>
        </>
      )}
      {checkoutStep === 2 && (
        <ItemsWrapper>
          <Typography variant="h4">Payment</Typography>
          <Button onClick={handleCheckoutStepChange}>
            <ShoppingCartIcon />
            Go to pay
          </Button>
          <Button onClick={() => setChechoutStep((prev) => prev - 1)}>
            Volver
          </Button>
        </ItemsWrapper>
      )}
      {checkoutStep === 3 && (
        <ItemsWrapper>
          <Typography variant="h4">Confirmar</Typography>
          <p>Se agregarán {cartPokemons.length} pokemones a tu inventario</p>
          <Button onClick={handleCheckoutStepChange}>Confirmar</Button>
          <Button onClick={() => setChechoutStep((prev) => prev - 1)}>
            Volver
          </Button>
        </ItemsWrapper>
      )}
    </CartWrapper>
  );
}

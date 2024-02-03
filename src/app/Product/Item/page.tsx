import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { CartItemType } from '~/app/page';
import { Wrapper } from './item.styles';
import * as React from 'react';

type Props = {
    item: CartItemType;
    handleAddToCart: (clickedItem: CartItemType) => void;
}

const Item: React.FC<Props> = ({item, handleAddToCart}) =>(
    <Wrapper>
        <img src={item.image} alt={item.title} />
        <div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <h3>${item.price}</h3>
        </div>
        <Button variant="outlined" onClick={()=>handleAddToCart(item)}>Add to Cart</Button>
    </Wrapper>
)

export default Item;

export function BasicButtons() {
    return (
      <Stack spacing={2} direction="row">
        <Button variant="contained">Contained</Button>
        <Button variant="outlined">Outlined</Button>
      </Stack>
    );
  }
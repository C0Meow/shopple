"use client";

import { useQuery } from "@tanstack/react-query";
import { Badge, Drawer, Grid } from "@mui/material";
import { useState } from "react";
import { api } from "~/trpc/react";
import { CartItemType } from "../page";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Wrapper } from "./Item/item.styles";
import * as React from 'react';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Item from "./Item/page";

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            props.value,
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }
  
  export function LinearWithValueLabel() {
    const [progress, setProgress] = React.useState(10);
  
    React.useEffect(() => {
      const timer = setInterval(() => {
        setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
      }, 800);
      return () => {
        clearInterval(timer);
      };
    }, []);
  
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgressWithLabel value={progress} />
      </Box>
    );
  }

export default function StorePage(){
    const getProducts = async (): Promise<CartItemType[]> =>
    await (await fetch("https://fakestoreapi.com/products")).json();
    const {data, isLoading, error} = useQuery<CartItemType[]>(["products"], getProducts);
    console.log(data);

    const getTotalItems = () =>null;
    const handleAddToCart = (clickedItem: CartItemType) =>null;
    const handleRemoveFromCart = () =>null;

    if (isLoading) return <LinearWithValueLabel />;
    if (error) return <div>something went wrong...</div>

    // const user = useUser();
    // const [input, setInput] = useState("");
    // const ctx = api.useUtils();
    // const {mutate, isLoading: isPosting} = api.orders.create.useMutation({onSuccess: () =>{
    //     setInput("");
    //     void ctx.orders.getAll.invalidate();
    //     toast.success("留言成功! 請手動刷新去查看你最新的留言!");
    // },
    // onError: (e) => {
    //     const errorMessage = e.data?.zodError?.fieldErrors.content;
    //     if (errorMessage?.[0]){
    //       toast.error(errorMessage[0]!);
    //     }
    //     else {
    //       toast.error("留言失敗, 請稍候再嘗試");
    //     }
    // }});
    
    return (
      <Wrapper>
        <Grid container spacing={3}>
            {data?.map(item => (
                <Grid item key={item.id} xs={12} sm={4}>
                    <Item item={item} handleAddToCart={handleAddToCart} />
                </Grid>
            ))}
        </Grid>
      </Wrapper>
    )
  }
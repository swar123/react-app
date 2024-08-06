import React from "react";
import { Card, CardContent, Typography, Grid } from '@mui/material';

const quotes = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Run your own race, at your own pace and in your own space.", author: "S.P.M.S Sindhur Sharma" },
    { text: "The purpose of our lives is to be happy.", author: "Dalai Lama" },
    { text: "Get busy living or get busy dying.", author: "Stephen King" },
    { text: "If you get tired, learn to rest, not to quit.", author: "S.P.M.S Sindhur Sharma" },
  ];
function DashBoard(){

    return (
        <Grid container spacing={2}>
      {quotes.map((quote, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                {quote.text}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                - {quote.author}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
    );
}

export default DashBoard;

import React from 'react'
import {Document, Page, Text, StyleSheet,View} from '@react-pdf/renderer'
import {Table,TableHeader,TableCell,TableBody,DataTableCell} from '@david.kucsai/react-pdf-table'
const Invoice = ({order}) => {
   return(<Document>
      <Page style={styles.body} >
          <Text  style={styles.header}> ~ {new Date().toLocaleDateString()} ~ </Text>
          <Text  style={styles.title}> Invoice </Text>
          <Text  style={styles.author}> React Redux Ecommerce </Text>
          <Text  style={styles.subtitle}> Order Summery </Text>
         {/* <View style={styles.section}>
              
         </View>  */}
         <View>
         <Table data={order.products}>
            <TableHeader>
                <TableCell>Title</TableCell>
                <TableCell>Brand</TableCell>
                <TableCell>Count</TableCell>
                <TableCell>Price(₦)</TableCell>
                <TableCell>Total Price(₦)</TableCell>
                <TableCell>Shipping</TableCell>
            </TableHeader>
            <TableBody>
                <DataTableCell getContent={(prod) => prod.product.title}/>
                <DataTableCell getContent={(prod) => prod.color}/>
                <DataTableCell getContent={(prod) => prod.count}/>
                <DataTableCell getContent={(prod) => prod.price}/>
                <DataTableCell getContent={(prod) => prod.price * prod.count}/>
                <DataTableCell getContent={(prod) => prod.product.shippingr}/>
            </TableBody>
        </Table>
        </View> 

        <View>
        <Text >payment Id: {' '}{order.paymentIntent.id}  </Text>
        <Text >order date: {' '}{order.createdAt.toLocaleString()}  </Text>
        <Text >Amount paid: {' '}{(order.paymentIntent.amount / 100).toFixed(2)}  </Text>
        <Text >order status: {' '}{order.orderStatus}  </Text>
        </View>
      
                
      </Page>
   </Document>
);
}
const styles = StyleSheet.create({
    body: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
    },
    title: {
      fontSize: 24,
      textAlign: "center",
    },
    author: {
      fontSize: 12,
      textAlign: "center",
      marginBottom: 40,
    },
    subtitle: {
      fontSize: 18,
      margin: 12,
    },
    text: {
      margin: 12,
      fontSize: 14,
      textAlign: "justify",
    },
    image: {
      marginVertical: 15,
      marginHorizontal: 100,
    },
    header: {
      fontSize: 12,
      marginBottom: 20,
      textAlign: "center",
      color: "grey",
    },
    footer: {
      padding: "100px",
      fontSize: 12,
      marginBottom: 20,
      textAlign: "center",
      color: "grey",
    },
    pageNumber: {
      position: "absolute",
      fontSize: 12,
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: "center",
      color: "grey",
    },
  });
export default Invoice
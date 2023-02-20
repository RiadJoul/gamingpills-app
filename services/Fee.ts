export default function calculateProfit(bet: number) {
    //our platform fee **Percentage**
    //TODO: get this from server
    const fee = 10;
    return bet * 2 - (fee * (bet * 2)) / 100;
}
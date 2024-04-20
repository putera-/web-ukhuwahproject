const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0 // You can adjust this value if you want to show decimals
});


export const toRupiah = (amount: number) => {
    return formatter.format(amount);
}
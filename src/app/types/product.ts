export interface Product {
  productId: number;
  name: string;
  description: string;
  price: number;
  quantity: string;
  image: string;
}

export const productsData: Product[] = [
  {
    productId: 1,
    name: 'Apple iPhone 14 Pro',
    description: '6.1-inch Super Retina XDR display with ProMotion',
    price: 999.99,
    quantity: '10',
    image:
      'https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/h/r/e/-original-imaghxeeme2n7hy7.jpeg?q=70&crop=false',
  },
  {
    productId: 2,
    name: 'Samsung Galaxy S23 Ultra',
    description: '6.8-inch Dynamic AMOLED 2X Display',
    price: 1199.99,
    quantity: '8',
    image:
      'https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/q/k/h/-original-imagzm8qmr7qxfhq.jpeg?q=70&crop=false',
  },
  {
    productId: 3,
    name: 'MacBook Pro 16',
    description: 'Apple M2 Pro chip, 16GB RAM, 512GB SSD',
    price: 2499.99,
    quantity: '5',
    image:
      'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/mbp16-silver-gallery1-202410?wid=4000&hei=3074&fmt=jpeg&qlt=90&.v=a1JjRDRsd3ZmQ3ZlOGljZksySnlFMG5YK2I4dGw3TVJCcUlIUHphdmNNWFJ3SGxFQnZFYlFmUGpNYmN6bUlFWnZvdUZlR0V0VUdJSjBWaDVNVG95YkZzSi9RTFdXTHA0YlFQUGtmVEs0REU',
  },
  {
    productId: 4,
    name: 'Sony WH-1000XM4',
    description: 'Wireless Noise Cancelling Headphones',
    price: 349.99,
    quantity: '15',
    image: 'https://m.media-amazon.com/images/I/61oqO1AMbdL._SX425_.jpg',
  },
  {
    productId: 5,
    name: 'iPad Air',
    description: '10.9-inch Liquid Retina display, M1 chip',
    price: 599.99,
    quantity: '12',
    image:
      'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSP7srgZIlGjXtPs_elPC-kDKerE3mcyAnZPVbpacG27uPML4g9ZV81fBJAPqRBFKrs6V1CkAjRPvt28EbXjiTwamAUw2UxVTHjYvv-7eUy',
  },
  {
    productId: 6,
    name: 'Dell XPS 15',
    description: '15.6-inch 4K UHD+, Intel i9, 32GB RAM',
    price: 2299.99,
    quantity: '6',
    image:
      'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/xps-notebooks/16-9640/media-gallery/silver/touch/notebook-laptop-xps-16-9640-t-silver-gallery-2.psd?fmt=png-alpha&pscan=auto&scl=1&hei=402&wid=612&qlt=100,1&resMode=sharp2&size=612,402&chrss=full',
  },
  {
    productId: 7,
    name: 'Apple Watch Series 8',
    description: 'GPS + Cellular, 45mm Aluminum Case',
    price: 499.99,
    quantity: '20',
    image:
      'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcT8BPbromLmTF5YXYyNorAZW1Pnsh8_ZRGlNuCX6jAfASl5uolmIT2PW6MKeKOnpnKOLpLiApGoTbnk0GQlNNooupymLsYWvid0V-71Ge9Jxl7p3ijdPbj4hZKlBYS0y7BFI_b_hQU&usqp=CAc',
  },
  {
    productId: 8,
    name: 'Google Pixel 7 Pro',
    description: '6.7-inch QHD+ display, 128GB storage',
    price: 899.99,
    quantity: '9',
    image:
      'https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/z/g/q/-original-imaggsueh4b26fj7.jpeg?q=70&crop=false',
  },
  {
    productId: 9,
    name: 'Nintendo Switch OLED',
    description: '7-inch OLED screen, White',
    price: 349.99,
    quantity: '11',
    image:
      'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRh2IW_R4UCeLW15ydS5iKtgLSjMDWxvUJv7jMgDhFiKGSe2-hJ8ZmkDcfn7oci32y9OwpsdX62Qo27FTi_dwhY6gzORBuAfH9j2hEry60pGXURPBS5tDSmRZY',
  },
  {
    productId: 10,
    name: 'Samsung 49" Odyssey G9',
    description: '49-inch Curved Gaming Monitor, 240Hz',
    price: 1499.99,
    quantity: '4',
    image:
      'https://rukminim2.flixcart.com/image/416/416/xif0q/monitor/a/r/p/lc49g95tsswxxl-quad-hd-49-2022-lc49g95tsswxxl-samsung-original-imagt4wp9pew4npx.jpeg?q=70&crop=false',
  },
  {
    productId: 11,
    name: 'AirPods Pro',
    description: 'Active Noise Cancellation, Spatial Audio',
    price: 249.99,
    quantity: '25',
    image:
      'data:image/jpeg;base64,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',
  },
  {
    productId: 12,
    name: 'Xbox Series X',
    description: '4K Gaming Console, 1TB SSD',
    price: 499.99,
    quantity: '7',
    image:
      'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRjpDEFlrB15UuVnA7C86RXeCDs-lNPJ44KDc6AlyVsPS_SaQdMmXHErNwwkKTroFpgaLyNNP7F40cuqIDmAj8eXKO1oNd3rYA7iWQdPF72afulbR_REp8cyA',
  },
  {
    productId: 13,
    name: 'Canon EOS R6',
    description: 'Mirrorless Camera, 20.1MP Full-Frame',
    price: 2499.99,
    quantity: '3',
    image:
      'https://in.canon/media/image/2022/10/31/f3c87634b8404210a234e6a623014583_EOS+R6+Mark+II+Body+Front+Slant.png',
  },
  {
    productId: 14,
    name: 'LG C2 65" OLED TV',
    description: '4K Smart OLED TV, 120Hz',
    price: 1999.99,
    quantity: '6',
    image:
      'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTdfXSWlHBYtU2Y4DMPraRy4HXY1CyNSixlxehazR0oki4MiDqumJhybtbOreBisx84pkzB0ZfN39XE510OKDJCsK_jKwqUVRoiY6RRSrA',
  },
  {
    productId: 15,
    name: 'Razer Blade 15',
    description: 'Gaming Laptop, RTX 3080, 32GB RAM',
    price: 2799.99,
    quantity: '4',
    image: 'https://m.media-amazon.com/images/I/61WdX6qqDqL._SX679_.jpg',
  },
  {
    productId: 16,
    name: 'DJI Mini 3 Pro',
    description: 'Lightweight Drone with 4K Camera',
    price: 759.99,
    quantity: '8',
    image: 'https://m.media-amazon.com/images/I/61koi1zbnNL._AC_SY355_.jpg',
  },
  {
    productId: 17,
    name: 'Bose QuietComfort 45',
    description: 'Wireless Noise Cancelling Headphones',
    price: 329.99,
    quantity: '14',
    image: 'https://m.media-amazon.com/images/I/51f7KKP25PL._AC_SY355_.jpg',
  },
  {
    productId: 18,
    name: 'Surface Pro 9',
    description: '13-inch 2-in-1 Laptop, Intel i7',
    price: 1599.99,
    quantity: '7',
    image: 'https://m.media-amazon.com/images/I/51+iKnnyQeL._SX522_.jpg',
  },
  {
    productId: 19,
    name: 'GoPro HERO11 Black',
    description: '5.3K Action Camera, Waterproof',
    price: 499.99,
    quantity: '16',
    image: 'https://m.media-amazon.com/images/I/51t6c5t0nDL._SY355_.jpg',
  },
  {
    productId: 20,
    name: 'Sonos Arc',
    description: 'Premium Smart Soundbar, Dolby Atmos',
    price: 899.99,
    quantity: '5',
    image:
      'https://www.ooberpad.com/cdn/shop/files/SonosArcUltra.webp?v=1743486876&width=750',
  },
];

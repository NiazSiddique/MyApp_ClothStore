import Product from '../models/product';
import Customer from '../models/customer';

export const PRODUCTS = [
  new Product(
    'p1',
    'Shirts',
    'https://m.media-amazon.com/images/I/61IA44vj5wS._AC_UL1500_.jpg',
    '1200-4500',
    '36-48'
  ),
  new Product(
    'p2',
    'tShirts',
    'https://th.bing.com/th/id/OIP.LoBpjUQJzzx_Hlf8vtM-zgHaJ4?pid=ImgDet&rs=1',
    '800-3500',
    '36-48'
  ),
  new Product(
    'p3',
    'Panjabis',
    'https://www.stylostreet.com/wp-content/uploads/2019/07/latest-Gents-wear-Kurta-collection-by-Almirah-3.jpg',
    '1500-4500',
    '36-48'
  ),
  new Product(
    'p4',
    'Casuals',
    'https://images-na.ssl-images-amazon.com/images/I/61yd41J0JSL._AC_UX425_.jpg',
    '1000-3000',
    '36-48'
  ),
  new Product(
    'p5',
    'Pants',
    'https://img01.ztat.net/article/spp-media-p1/18abe55216d03da0bafe17e85aaa5ae7/3f036ea8608f4f8abeeffa10cf003f6a.jpg?imwidth=762',
    '2500-6000',
    '36-48'
  ),
  new Product(
    'p6',
    'Trousers',
    'https://th.bing.com/th/id/R.e69421f052baf23a01500454f44374b0?rik=gJvcAO4Er4%2fxMA&riu=http%3a%2f%2fmedia.bizwebmedia.net%2fSites%2f127046%2fdata%2fimages%2f2018%2f9%2f1906227quan_jogger_gucci_gg_supreme_print_chuan_authentic_3.jpg%3f0&ehk=hhdstIkC8n9e9ZMqQHq0we5cVIOLRr3F3E3EIuz%2fyMg%3d&risl=&pid=ImgRaw&r=0',
    '1200-300',
    '36-48'
  ),
  new Product(
    'p7',
    'Jeans',
    'https://th.bing.com/th/id/OIP.cCEgDYmhmUNeSUUYS5Wf6AHaKl?pid=ImgDet&rs=1',
    '2500-5000',
    '36-48'
  ),
  new Product(
    'p8',
    'Jerseys',
    'https://th.bing.com/th/id/R.c4a533f614ff25ac724097f0bb69e3fe?rik=B3nlkrWKKipuIg&riu=http%3a%2f%2fimages.joyfuljerseys.net%2fimages%2fCathy%2f2018%2f201804042%2fOhio-State-Buckeyes-Red-Men%27s-Customized-College-Football-Jersey.jpg&ehk=3foWqY7FcNrcuqZoksC6V7RlpoZIN3PiMaYYZRsegc0%3d&risl=&pid=ImgRaw&r=0',
    '2000-4000',
    '36-48'
  ),
  new Product(
    'p9',
    'Jackets',
    'https://i.ebayimg.com/00/s/NTAwWDUwMA==/z/pXoAAOSwUQxj-1K7/$_57.PNG?set_id=8800005007',
    '3500-6000',
    '36-48'
  ),
  new Product(
    'p10',
    'Innerwears',
    'https://uniworthdress.com/uploads/product//webp/9225828bdc9cff7e4ce0907313854ef7.webp',
    '450-2500',
    '36-48'
  ),
];

export const CUSTOMERS = [
  new Customer('c1', 'Abdullah-bin Zaynal', '01731221154', 'Satkhira'),
  new Customer('c2', 'Abdur Rahim', '01717000325', 'Ashashuni'),
  new Customer('c3', 'Zayed khan', '01960188522', 'Kaligang'),
  new Customer('c4', 'Md Akash', '01816321654', 'Shymnagor'),
  new Customer('c5', 'Kholilur', '01623458745', 'Debhata'),
  new Customer('c6', 'Rajnath Roy', '01943214587', 'Bishnopur'),
  new Customer('c7', 'Rajib Shaha', '01711659832', 'Kalaroa'),
  new Customer('c8', 'Fahmid Ali', '01703142536', 'Tala'),
  new Customer('c9', 'Mustafiz', '01705365214', 'Patkelghata'),
  new Customer('c10', 'Bellal Shekh', '01945658965', 'Nolta'),
  new Customer('c11', 'Ojiar Ali', '01865126578', 'Vomra'),
  new Customer('c12', 'Kamrul Hassan', '01624853641', 'Sonabaria'),
  new Customer('c13', 'Mortuza', '01960332457', 'Ammtola'),
];

import CandlestickChart from '@/components/CandlestickChart';
import { fetcher } from '@/lib/coingecko.actions';
import { formatCurrency } from '@/lib/utils';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'node:path/win32';
import React from 'react'
import CoinHeader from '@/components/CoinHeader';
import { Separator } from '@/components/ui/separator';
import Converter from '@/components/Converter';

const page = async ({ params }: NextPageProps) => {
    const { id } = await params;


    const [coinData, coinOHLCData] = await Promise.all([
        fetcher<CoinDetailsData>(`/coins/${id}`, {
            dex_pair_format: 'symbol'
        }),
        fetcher<OHLCData[]>(`/coins/${id}/ohlc`, {
            vs_currency: 'inr',
            days: 1,
            precision: 'full'
        })
    ])

    const coinDetails = [
        {
            label: 'Market Cap',
            value: formatCurrency(coinData.market_data.market_cap.inr)

        },
        {
            label: 'Market Cap',
            value: `# ${coinData.market_cap_rank}`
        },
        {
            label: 'Total Volume',
            value: formatCurrency(coinData.market_data.total_volume.inr)
        },
        {
            label: 'Website',
            value: '-',
            link: coinData.links.homepage[0],
            linkText: 'Homepage',
        },
        {
            label: 'Explorer',
            value: '-',
            link: coinData.links.blockchain_site[0],
            linkText: 'Explorer',
        },
        {
            label: 'Community',
            value: '-',
            link: coinData.links.subreddit_url,
            linkText: 'Community',
        }
    ]
    return <main id='coin-details-page'>
        <section className='primary'>
            <CoinHeader
            name={coinData.name}
            image={coinData.image.large}
            livePrice={coinData.market_data.current_price.inr}
            livePriceChangePercentage24h={coinData.market_data.price_change_percentage_24h_in_currency.inr}
            priceChangePercentage30d={coinData.market_data.price_change_percentage_30d_in_currency.inr}
            priceChange24h={coinData.market_data.price_change_24h_in_currency.inr}
            />
            <Separator className='divider'/>
                <div id="coin-overview">
                    <CandlestickChart data={coinOHLCData} coinId={id}>

                        

                    </CandlestickChart>
                </div>

            <p> Trend OverView</p>
            <p>Recent Trades</p>
            <p>Exchange Listings</p>
        </section>
        <section className='secondary'>
            <Converter 
            symbol={coinData.symbol} 
            icon={coinData.image.small} 
            priceList={coinData.market_data.current_price}/>
            <div className='details'>
                <h4> Coin Details</h4>
                <ul className='details-grid'>
                    {coinDetails.map(({ label, value, link, linkText }, index) => (
                        <li key={index}>
                            <p className={label}>{label}</p>
                            {link ? (
                                <div className='link'>
                                    <Link href={link} target="_blank">
                                        {linkText || label}
                                    </Link>
                                    <ArrowUpRight size={16} />
                                </div>
                            ) : (
                                <p className='text-base font-medium'>{value}</p>
                            )}
                        </li>
                    ))}
                </ul>

            </div>
            <p>Top Gainer and loosers</p>

        </section>

    </main>
}

export default page
import { fetcher } from '@/lib/coingecko.actions'
import React from 'react'
import Image from 'next/image'
import { cn, formatCurrency } from '@/lib/utils';
import { CoinOverviewFallback } from './Fallback';

const CoinOverview = async() => {
    let coin;
    try{
     coin = await fetcher<CoinDetailsData>('/coins/bitcoin', {
            dex_pair_format: 'symbol'
        })
    }catch(e){
        console.error("Error fetching coin", e )
        return <CoinOverviewFallback />;
    }
    
  return (
        <div id="coin-overview">
          <div className='header pt-2'>
              <Image src={coin.image.large}
                  alt={coin.name}
                  width={56}
                  height={56}
              />
              <div className='info'>
                  <p> {coin.name} / {coin.symbol.toUpperCase()}</p>
                  <h1>{formatCurrency(coin.market_data.current_price.inr)}</h1>
              </div>

          </div>
      </div>
  )
}

export default CoinOverview
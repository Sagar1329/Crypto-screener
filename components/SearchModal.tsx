





'use client';


import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"

import{useState,useEffect} from 'react'
import { useDebounce } from "@/hooks/useDebounce"
import { fetcher } from "@/lib/coingecko.actions"
import { extractMatchingCoins } from "@/lib/utils";
import Link from "next/link";
const SearchModal = () => {
const [results, setResults] = useState<CoinMinimal[]>([])
    const [open, setOpen] = useState(false)
    const [query,setQuery] = useState('')
    const debouncedSearch = useDebounce(query,2000);
  
    useEffect(() => {
        if (!debouncedSearch.trim()) {
            setResults([]);
            return;
        }

        search(debouncedSearch);
    }, [debouncedSearch]);

    const search = async (searchTerm: string) => {
        try {
            const response = await fetcher<SearchCoin[]>('/search', { query: searchTerm })
            const response_ids =response?.coins.map((coin) => coin.id).slice(0,10)
            
            console.log("Response", response_ids.join(',').toString())
            console.log("Response 1 ", response_ids)

            const response2 = await fetcher<CoinMarketData[]>('/coins/markets', {
                vs_currency: "inr", 
                ids: response_ids.join(',').toString(),
                order: "market_cap_desc",
                price_change_percentage: "24h",
                per_page: 10,
                page: 1,
             })
            console.log("Response2 ", JSON.stringify(response2,null,2))

             const finalResult = extractMatchingCoins(response_ids,response2)
            setResults(finalResult)
            console.log("Final Result ", JSON.stringify(finalResult,null,2))


        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }

        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    return (
        <>
            <button onClick={() => setOpen(true)} className="text-muted-foreground text-sm">
               Search
            </button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Type a command or search..." 
                                value={query} 
                                onValueChange={setQuery}/>
                <CommandList>
                    {query && results.length === 0 && (
                        <CommandEmpty>No results found.</CommandEmpty>
                    )}
                    <CommandGroup heading="Coins">
                        {
                            results.map((result) => (
                                <CommandItem key={result.id} value={result.name}
                             
                                >
                                    <Link href={`/coins/${result.id}`} >
                                    <div className="flex items-center gap-2">
                                        <img src={result.image} alt={result.name} className="h-6 w-6" />
                                        <span>{result.name}</span>
                                    </div>
                                    </Link>
                                </CommandItem>
                            ))
                        }
                        </CommandGroup>
                  
                   
                </CommandList>
            </CommandDialog>
        </>
    )
}
export default SearchModal
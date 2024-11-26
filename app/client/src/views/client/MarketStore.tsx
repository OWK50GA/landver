'use client'
import { useState } from "react";
import { Header } from "@/components/Headers/Header";
import { DropdownOptions } from "@/components/Options/DropdownOptions";
import { Searchbar } from "@/components/Search/Searchbar";
import Image from "next/image";
import { RangeCalendar } from "@/components/calendar/RangeCalendar";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button/Button";

type ValuePiece = Date | null;
type Value = [ValuePiece, ValuePiece];

function formatDate(date:Date){
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const monthIndex = date.getMonth()
  const dayIndex = date.getDate()

  return `${monthNames[monthIndex]} ${dayIndex}`
}

export default function MarketStoreClientView() {
  const router = useRouter()

  const [showFilters, setShowFilters] = useState(false)
  const [showDateRangeCalendar, setShowDateRangeCalendar] = useState(false)

  const [dateRange, setDateRange] = useState<Value>([new Date(),new Date()]);
  const startDate = (dateRange && dateRange[0]) ? formatDate(dateRange[0]) : null
  const endDate = (dateRange && dateRange[1]) ? formatDate(dateRange[1]) : null

  return (
    <div className="">
        <Header title="Market Store" hasCreateButton/>

        <div className="px-4">
          <div className="bg-white px-2 py-4 rounded-xl">
            
            <div className="flex justify-between items-start gap-2 flex-wrap">
              <div className="w-full lg:w-4/6">
                <Searchbar />
              </div>
              <div className="flex gap-3">
                <div onClick={()=>setShowFilters(!showFilters)} className="cursor-pointer relative rounded-lg bg-gray-100 px-5 py-2 text-center text-gray-500 flex gap-1">
                  <p>Filters</p>
                  <Image src={"icons/common/dropdown-grey.svg"} alt="" width={12} height={12} />
                  <DropdownOptions
                    options={[
                      { label:"All", action:()=>{} },
                      { label:"Approved", action:()=>{} },
                      { label:"Unapproved", action:()=>{} },
                      { label:"Bought", action:()=>{} },
                    ]}
                    show={showFilters}
                    onClose={()=>setShowFilters(false)}
                  />
                </div>
                <div onClick={()=>setShowDateRangeCalendar(!showDateRangeCalendar)} className="cursor-pointer relative flex gap-2 rounded-lg bg-gray-100 px-5 py-2 text-center text-gray-500 flex-shrink-0">
                  <Image src={"icons/common/calendar-gray.svg"} alt="" width={14} height={14} />
                  <p>{startDate} - {endDate}</p>
                  {
                    showDateRangeCalendar && (
                        <div className="absolute top-[110%] right-0" style={{ zIndex:10000 }} onClick={(e)=>e.stopPropagation()}>
                          <RangeCalendar value={dateRange} onChange={setDateRange} />
                        </div>
                    )
                  }
                </div>
              </div>          
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pt-5">
              {
                [1,2,3,4,5,6,7,8,9].map((item, index)=>{
                  return (
                    <div className="min-h-[300px] w-full px-0 sm:px-5 lg:px-0 xl:px-3">
                      <div className="bg-white h-full rounded-lg w-full border border-gray-200 px-2 py-2">

                        <div className="flex py-1 ">
                          <div className="rounded-full w-12 h-12 bg-gray-200"></div>
                          <div>
                            <p className="text-base font-bold">Tress-30</p>
                            <p className="text-gray-500">owner</p>
                          </div>
                          <div className="flex justify-end flex-1 items-center">
                            <p>Heart</p>
                          </div>
                        </div>

                        <div className="py-3">
                          <div className="bg-gray-200 w-full h-[250px] rounded-lg"></div>
                        </div>

                        <div className="h-[1px] w-full bg-gray-200 my-3"></div>

                        <div className="flex py-1 ">
                          <div>
                            <p className="text-gray-500 text-sm">price</p>
                            <p className="text-base font-bold">0.25 ETH</p>
                          </div>
                          <div onClick={()=>{ router.push(`/market-store/detail/${item}`) }} className="cursor-pointer flex justify-end flex-1 items-center">
                            <Button variant="whiteWithBorder">
                              View Details
                            </Button>
                          </div>
                        </div>

                      </div>
                    </div>
                  )
                })
              }
            </div>

          </div>
        </div>


    </div>
  );
}

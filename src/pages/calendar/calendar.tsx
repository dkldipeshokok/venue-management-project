import { useState } from "react";
import NepaliDate from "nepali-date-converter";
import { ChevronLeft, ChevronRight } from "lucide-react";

const NEPALI_DAYS = ["आइत", "सोम", "मंगल", "बुध", "बिहि", "शुक्र", "शनि"];

const NEPALI_MONTHS = ["वैशाख", "जेठ", "असार", "श्रावण", "भाद्र", "आश्विन", "कार्तिक", "मंसिर", "पौष", "माघ", "फाल्गुन", "चैत्र"];

const NEPALI_NUMERALS = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];

const toDevanagari = (value: number) => {
    return value
        .toString()
        .split("")
        .map((digit) => NEPALI_NUMERALS[Number(digit)])
        .join("");
};

function Calendar() {
    const today = new NepaliDate();

    const [currentYear, setCurrentYear] = useState(today.getYear());
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [selectedDay, setSelectedDay] = useState(today.getDate());

    const firstDay = new NepaliDate(currentYear, currentMonth, 1);

    const startDay = firstDay.getDay();

    let daysInMonth = 0;

    for (let day = 1; day <= 32; day++) {
        const date = new NepaliDate(currentYear, currentMonth, day);

        if (date.getYear() !== currentYear || date.getMonth() !== currentMonth) {
            break;
        }

        daysInMonth = day;
    }

    const days = Array.from({ length: daysInMonth }, (_, index) => {
        const bsDay = index + 1;

        const bsDate = new NepaliDate(currentYear, currentMonth, bsDay);

        const adDate = bsDate.toJsDate();

        return { bsDay, adDay: adDate.getDate(), adMonth: adDate.getMonth(), dayOfWeek: bsDate.getDay() };
    });

    const previousMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear((year) => year - 1);
        } else {
            setCurrentMonth((month) => month - 1);
        }

        setSelectedDay(1);
    };

    const nextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear((year) => year + 1);
        } else {
            setCurrentMonth((month) => month + 1);
        }

        setSelectedDay(1);
    };

    const isToday = (day: number) => {
        return currentYear === today.getYear() && currentMonth === today.getMonth() && day === today.getDate();
    };

    return (
        <div className="w-full min-h-screen bg-gray-300 p-6">

            <div className="mb-4">
                <h1 className="text-3xl font-bold text-slate-900">
                    नेपाली पात्रो
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                    Bikram Sambat Calendar — शुभ लगन
                    (Auspicious Dates)
                </p>
            </div>

            <div className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                <div className="relative flex items-center justify-center px-4 py-4">

                    <button type="button" onClick={previousMonth} className="absolute left-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#203f91] text-white transition hover:bg-[#183274]">
                        <ChevronLeft size={18} />
                    </button>

                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-slate-900">
                            {NEPALI_MONTHS[currentMonth]}{" "}
                            {toDevanagari(currentYear)}
                        </h2>

                        <p className="mt-0.5 text-sm text-slate-500">
                            {firstDay.toJsDate().toLocaleString("en-US", { month: "long", year: "numeric" })}
                            {" - "}
                            {new NepaliDate(currentYear, currentMonth, daysInMonth).toJsDate().toLocaleString("en-US", { month: "long", year: "numeric" })}
                        </p>
                    </div>

                    <button type="button" onClick={nextMonth} className="absolute right-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#203f91] text-white transition hover:bg-[#183274]">
                        <ChevronRight size={18} />
                    </button>
                </div>

                <div className="grid grid-cols-7 border-y border-slate-100 bg-white">

                    {NEPALI_DAYS.map((day, index) => (
                        <div key={day} className={`py-3 text-center text-sm font-semibold ${index === 6 ? "text-red-600" : "text-slate-900"}`}>
                            {day}
                        </div>
                    ))}

                </div>

                <div className="grid grid-cols-7 gap-1.5 bg-slate-50 p-3">

                    {Array.from({ length: startDay }).map((_, index) => (
                        <div key={`empty-${index}`} className="min-h-[110px]" />
                    ))}

                    {days.map((item) => {

                        const selected = selectedDay === item.bsDay;

                        const todayDate = isToday(item.bsDay);

                        const saturday = item.dayOfWeek === 6;

                        return (
                            <button type="button"  key={item.bsDay} onClick={() => setSelectedDay(item.bsDay)}  className={`group relative min-h-[110px] rounded-xl border p-3 text-left transition ${todayDate ? "border-green-600 bg-green-50" : selected ? "border-[#203f91] bg-white ring-2 ring-blue-100" : saturday ? "border-red-200 bg-red-50 hover:border-red-300" : "border-slate-200 bg-white hover:border-slate-300"}`} >

                                <div className="flex items-start justify-between">

                                    <span className={`text-2xl font-bold leading-none ${todayDate ? "text-green-700" : saturday ? "text-red-600" : "text-slate-900"}`}>
                                        {toDevanagari(item.bsDay)}
                                    </span>

                                    <span className={`text-xs ${saturday ? "text-red-400" : "text-slate-400"}`}>
                                        {String(item.adDay).padStart(2, "0")}
                                    </span>

                                </div>

                                {[ 1,  5,   10,  15, ].includes(item.bsDay) && (
                                    <div className="absolute bottom-3 left-3">
                                        <span className="inline-block rounded border border-amber-200 bg-amber-50 px-2 py-1 text-[10px] font-medium text-amber-700">
                                            शुभ लगन
                                        </span>
                                    </div>
                                )}

                            </button>
                        );
                    })}

                </div>

                <div className="flex items-center justify-between border-t border-slate-200 px-4 py-3">

                    <div className="flex items-center gap-2 text-sm text-slate-500">
                        <span className="h-3.5 w-3.5 rounded-sm border border-amber-400 bg-amber-50" />
                        <span>शुभ लगन</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-slate-500">
                        <span className="h-3.5 w-3.5 rounded-sm bg-orange-500" />
                        <span>Pending</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-slate-500">
                        <span className="h-3.5 w-3.5 rounded-sm bg-green-600" />
                        <span>Confirmed</span>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default Calendar;
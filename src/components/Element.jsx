import { returnLink } from "../Hooks/useTikTokData";

export default function Element({type, dispatch, item, lastInteraction}) {

    const ACTIONS = {
        FAVORITE: 'favorite',
        UNFAVORITE: 'unfavorite',
        DELETE: 'delete',
        RESTORE: 'restore'
    }

    const link = returnLink(item, type);
    const isLastInteraction = lastInteraction.fn===lastInteraction.index;

    if (type == 'Follower List' || type == 'Following List') {
        return (
            <div className={isLastInteraction?'w-64 h-12 m-2 transition-all duration-100 cursor-pointer flex  outline outline-8 rounded-md outline-[#942a8d] hover:bg-opacity-80 hover:scale-[105%]': 'w-64 h-12 m-2 transition-all duration-100 cursor-pointer flex outline outline-8 rounded-md outline-[#241623] hover:bg-opacity-80 hover:scale-[105%]'}  >
                <div className="flex-grow flex  bg-slate-600">
                    <div className="w-8 h-full bg-slate-700 "> </div>
                    <div className="flex-grow flex bg-inherit items-center px-2" onClick={() => window.open(link, 'blank')}>
                        <h3 className="bg-inherit w-32 text-[#FAFFD8] text-xl text-ellipsis overflow-hidden">@{item.UserName}</h3>
                    </div>
                    <p className="w-10 h-full bg-red-400 justify-center items-center flex" onClick={() => dispatch({ type: ACTIONS.DELETE, payload: { data: { "Date": item.Date, "Link": link } } })}>🔥</p>
                    <p className="w-10 h-full bg-yellow-200 justify-center items-center flex" onClick={() => dispatch({ type: ACTIONS.FAVORITE, payload: { data: { "UserName": item.UserName, "Link": link } } })}>⭐</p>
                </div>
            </div>
        )

    } else {
        return (
            <div className={isLastInteraction?'w-32 h-48 max-md:w-24 max-md:h-36 m-2 transition-all duration-100 cursor-pointer flex outline outline-8 rounded-md outline-[#942a8d] hover:bg-opacity-80 hover:scale-[105%]':'w-32 h-48 max-md:w-24 max-md:h-36 m-2 transition-all duration-100 cursor-pointer flex outline outline-8 rounded-md outline-[#241623] hover:bg-opacity-80 hover:scale-[105%]'}  >
                <div className="flex flex-col w-full">
                    <div className="flex">
                        <p className="bg-red-400 py-1 px-2" onClick={() => dispatch({ type: ACTIONS.DELETE, payload: { data: { "Date": item.Date, "Link": link } } })}>🔥</p>
                        <p className="flex-1 text-center py-1 px-2 bg-yellow-200" onClick={() => dispatch({ type: ACTIONS.FAVORITE, payload: { data: { "Date": item.Date, "Link": link } } })}>⭐</p>
                    </div>
                    <div className="bg-slate-600 flex-grow" onClick={() => window.open(link, 'blank')}></div>
                </div>
            </div>
        )
    }


}
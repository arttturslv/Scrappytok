import { useEffect, useReducer, useState } from "react";
import Header from "../components/Header";
import { Link, useParams,useNavigate } from "react-router-dom";
import Element from "../components/Element";
import { useShowData, useLocalFavorites, returnLink } from "../Hooks/useTikTokData";
import OptionsButtons from "../components/OptionsButtons";
import ArrowIcon from '../assets/arrow-icon.svg'

export default function View() {
    const navigate = useNavigate()
    const [file, setFile] = useState('');
    const [lastInteraction, setLastInteraction] = useState(null)
    const [filterNet, setFilterNet] = useState('normal');
    const { id } = useParams();

    const [localPreference, setLocalPreference] = useState(useLocalFavorites(id) ||
    {
        favorite: [],
        delete: [],
        normal: [],
    });

    const ACTIONS = {
        normal: 'normal',
        IMPORT_FILE: 'import_file',
        FAVORITE: 'favorite',
        DELETE: 'delete',
        CLEAR: 'clear'
    }

    const [preference, dispatch] = useReducer(reducer, localPreference);

    useEffect(() => {
        if(id=="Following List" || id=="Follower List") {
            const file = useShowData(id)[1];
            setFile(file);
            dispatch({ type: ACTIONS.IMPORT_FILE, payload: { data: file, preference } })

        } else {
            const file = useShowData(id)[0];
            setFile(file);
            dispatch({ type: ACTIONS.IMPORT_FILE, payload: { data: file, preference } })
        }
        setLocalPreference(useLocalFavorites(id))

    }, [id]);


    useEffect(() => {
        var ScrappyTok = JSON.parse(localStorage.getItem("ScrappyTok"));
        ScrappyTok[id] = preference;
        localStorage.setItem('ScrappyTok', JSON.stringify(ScrappyTok));
    }, [preference]);


    function reducer(state, action) {

        switch (action.type) {
            case ACTIONS.FAVORITE: {
                const data = action.payload.data;

                if (!Array.isArray(state.favorite)) {
                    console.log('FVazio')
                    return {...state};
                }

                const payloadAlreadySaved = state.favorite.some(fav => returnLink(fav, id) === returnLink(data, id))

                if(payloadAlreadySaved) {
                    console.log('FJá salvo. Apagando...')
                    return {
                            ...state, 
                            favorite: state.favorite.filter(fav => returnLink(fav, id) !== returnLink(data, id))
                        }
                }

                const hasOnNormal = Array.isArray(state.normal) && state.normal.length > 0 &&  state.normal.some(norm => returnLink(norm, id) === returnLink(data, id));
                if(hasOnNormal) { //remove dos deletados e adiciona nos favs;
                    
                    console.log('FSalvo no normal...')
                    return {
                            ...state,
                            favorite: [...state.favorite, data],
                            normal: state.normal.filter(norm => returnLink(norm, id) !== returnLink(data, id))
                        };
                } 

                const hasOnDeleted = Array.isArray(state.delete) && state.delete.length > 0 &&  state.delete.some(del => returnLink(del, id) === returnLink(data, id));
                if(hasOnDeleted) { //remove dos deletados e adiciona nos favs;
                    console.log('FSalvo no delete...')

                    return {
                            ...state,
                            favorite: [...state.favorite, data],
                            delete: state.delete.filter(del => returnLink(del, id) !== returnLink(data, id))
                        };
                } 

                console.log('FSalvando fav...')

                return {
                    ...state, 
                    favorite: [...state.favorite, data],
                }
                
            }
            case ACTIONS.DELETE: {
                const data = action.payload.data;

                if (!Array.isArray(state.delete)) {
                    console.log('FVazio')
                    return {...state};
                }

                const payloadAlreadySaved = state.delete.some(fav => returnLink(fav, id) === returnLink(data, id))

                if(payloadAlreadySaved) {
                    console.log('FJá salvo. Apagando...')
                    return {
                            ...state, 
                            delete: state.delete.filter(fav => returnLink(fav, id) !== returnLink(data, id))
                        }
                }

                const hasOnNormal = Array.isArray(state.normal) && state.normal.length > 0 &&  state.normal.some(norm => returnLink(norm, id) === returnLink(data, id));
                if(hasOnNormal) { //remove dos deletados e adiciona nos favs;
                    
                    console.log('FSalvo no normal...')
                    return {
                            ...state,
                            delete: [...state.delete, data],
                            normal: state.normal.filter(norm => returnLink(norm, id) !== returnLink(data, id))
                        };
                } 

                const hasOnFavorite = Array.isArray(state.favorite) && state.favorite.length > 0 &&  state.favorite.some(del => returnLink(del, id) === returnLink(data, id));
                if(hasOnFavorite) { //remove dos deletados e adiciona nos favs;
                    console.log('FSalvo no delete...')

                    return {
                            ...state,
                            delete: [...state.delete, data],
                            favorite: state.favorite.filter(del => returnLink(del, id) !== returnLink(data, id))
                        };
                } 

                console.log('FSalvando fav...')

                return {
                    ...state, 
                    delete: [...state.delete, data],
                }
                
            }
            case ACTIONS.IMPORT_FILE:
                return {...state, normal:action.payload.data}
            default:
                return "This action doesn't exist."
        }
    }


    return (
        <div className="w-full max-w-[1440px] mx-auto flex flex-col px-32 max-md:px-8 gap-8 items-center justify-center flex-wrap transition-all duration-500">
            <Header />
            <Link to={'..'}
                onClick={(e) => {
                    e.preventDefault();
                    navigate(-1);
                }} 
                className="flex gap-4 w-full mt-20  hover:pl-1 transition-all">
                <img className="w-8 rotate-90" src={ArrowIcon} alt="Icone de uma seta" />
                <h1  className="text-5xl  max-sm:text-3xl">{id}</h1>
            </Link>

            <OptionsButtons setFilterNet={setFilterNet}></OptionsButtons>

            <div className="flex flex-wrap gap-4 justify-start items-start w-full transition-all duration-500">
                {
                    filterNet == 'favorite' ?
                        renderElements(preference.favorite, dispatch, id, lastInteraction, setLastInteraction)
                    :
                    filterNet == 'delete' ?
                        renderElements(preference.delete, dispatch, id, lastInteraction, setLastInteraction)
                    :
                    filterNet === 'normal' && file.length > 0 &&
                        renderElements(preference.normal, dispatch, id, lastInteraction, setLastInteraction, preference)
                }

            </div>
        </div>
    )
}

function renderElements(preference, dispatch, id, lastInteraction, setLastInteraction) {
    return preference.map((item, index) => {
        return (
            <div onClick={()=> setLastInteraction(index)} className="m-0 p-0" key={index}>
                <Element lastInteraction={{fn:lastInteraction, index: index}} type={id} dispatch={dispatch} item={item}></Element>
            </div>
        )
    })
}

// function filteredAll(files, preference) {
//     var filtered = files;

//     if (preference.favorite.length != 0) {
//         filtered = filtered.filter((element) => {
//             return !preference.favorite.some((fav) => {
//                 return returnLink(fav) !==  returnLink(element);
//             });
//         });
//     }

//     if (preference.delete.length != 0) {
//         filtered = filtered.filter((element) => {
//             return !preference.delete.some((del) => {
//                 return returnLink(del) !==  returnLink(element);
//             });
//         });
//     }

//     return filtered;
    
// }



/*

    function reducer(state, action) {

        switch (action.type) {
            case ACTIONS.FAVORITE: {

                if(!returnLink(action.payload.data)) {
                    console.log(action.payload.data)
                    console.log("Sem link");
                    return {...state};
                }

                if (Array.isArray(state.favorite)) {
                    const alreadyHas = state.favorite.some(fav => returnLink(fav, id) === returnLink(action.payload.data.Link, id));

                    if (alreadyHas) {
                        console.log("is duplicate")
                        return {
                            ...state,
                            favorite: state.favorite.filter(fav => returnLink(fav, id) !== returnLink(action.payload.data.Link, id)),
                        };
                    }

                    if (Array.isArray(state.delete) && state.delete.length > 0) {
                        const hasOnDeleted = state.delete.some(del => returnLink(del, id) === returnLink(action.payload.data.Link, id));
                        if (hasOnDeleted) {
                            if (alreadyHas) {
                                return {
                                    ...state,
                                    favorite: state.favorite.filter(fav => returnLink(fav, id) !== returnLink(action.payload.data.Link, id)),
                                    delete: state.delete.filter(del => returnLink(del, id) !== returnLink(action.payload.data.Link, id))
                                };
                            } else {
                                return {
                                    ...state,
                                    favorite: [...state.favorite, action.payload.data],
                                    delete: state.delete.filter(del => returnLink(del, id) !== returnLink(action.payload.data.Link, id))
                                };
                            }
                        }
                    } else if (alreadyHas) {
                        return {
                            ...state,
                            favorite: state.favorite.filter(fav => returnLink(fav, id) !== returnLink(action.payload.data.Link, id)),
                        };
                    } else {
                        return {
                            ...state,
                            favorite: [...state.favorite, action.payload.data]
                        };
                    }
                } else {
                    console.log("state.favorite não é um array");
                }
            }
            
            case ACTIONS.DELETE:
                if (Array.isArray(state.delete)) {
                    const isDuplicate = state.delete.some(del => del.Link === action.payload.data.Link);

                    if (Array.isArray(state.favorite) && state.favorite.length > 0) {
                        const hasOnFavorite = state.favorite.some(fav => fav.Link === action.payload.data.Link);
                        if (hasOnFavorite) {
                            if (isDuplicate) {
                                return {
                                    ...state,
                                    favorite: state.favorite.filter(fav => fav.Link !== action.payload.data.Link),
                                    delete: state.delete?.filter(del => del.Link !== action.payload.data.Link)
                                };
                            } else {
                                return {
                                    ...state,
                                    delete: [...state.delete, action.payload.data],
                                    favorite: state.favorite.filter(fav => fav.Link !== action.payload.data.Link)
                                };
                            }
                        }
                    } else if (isDuplicate) {
                        return {
                            ...state,
                            delete: state.delete?.filter(del => del.Link !== action.payload.data.Link)
                        };

                    } else {
                        return {
                            ...state,
                            delete: [...state.delete, action.payload.data]
                        };
                    }
                } else {
                    console.log("state.delete não é um array");
                }
            case ACTIONS.CLEAR:
                return { favorite: [], delete: [], normal: [] }
            case ACTIONS.IMPORT_FILE:
                return {...state, normal:action.payload.data}
            default:
                return "This action doesn't exist."
        }
    }


*/
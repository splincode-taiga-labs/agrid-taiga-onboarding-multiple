import {type TravelPlanDto} from '../proposal.dto';

export const TRAVEL_PLANS: readonly TravelPlanDto[] = [
    {
        id: 1,
        title: 'Киото и Нара',
        country: 'Япония',
        season: 'Весна',
        durationDays: 8,
        status: 'Планируется',
        budget: '240 000 ₽',
        priority: 'Высокий',
    },
    {
        id: 2,
        title: 'Лиссабон и Синтра',
        country: 'Португалия',
        season: 'Осень',
        durationDays: 7,
        status: 'Идея',
        budget: '170 000 ₽',
        priority: 'Средний',
    },
    {
        id: 3,
        title: 'Таллин и острова',
        country: 'Эстония',
        season: 'Лето',
        durationDays: 5,
        status: 'Планируется',
        budget: '95 000 ₽',
        priority: 'Средний',
    },
    {
        id: 4,
        title: 'Рим и Флоренция',
        country: 'Италия',
        season: 'Весна',
        durationDays: 9,
        status: 'Идея',
        budget: '210 000 ₽',
        priority: 'Низкий',
    },
];

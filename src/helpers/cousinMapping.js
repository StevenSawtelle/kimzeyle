
export const cousins = [
    'Matthew',
    'Jaclyn',
    'Sarah',
    'Amber',
    'Corey',
    'Crystal',
    'Jacob',
    'Michael',
    'Savannah',
    'Steven',
    'Daniel',
    'Kaylee',
    'Chelsea',
    'Ethan',
    'Hunter',
    'Joseph',
    'Garrett',
    'Madisen',
    'Gabriel',
    'Alecia',
    'Carli',
    'Benjamin',
    'Samantha',
    'Casey',
    'Alyssa',
    'McKay',
    'Logan',
].sort();

// export const getRandomCousin = () => cousins[17];
export const getRandomCousin = () => cousins[Math.floor(Math.random()*cousins.length)];

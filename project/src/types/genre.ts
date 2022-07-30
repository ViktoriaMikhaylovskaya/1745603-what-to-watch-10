export const genres = ['ALL_GENRES', 'COMEDIES', 'CRIME', 'DOCUMENTARY', 'DRAMAS', 'HORROR', 'FAMILY', 'ROMANCE', 'SCI_FI', 'THRILLERS'] as const;

export type GenreType = typeof genres[number];

export class Genre {
  static fromString (s: string): GenreType {
    switch (s) {
      case 'Comedy': {
        return 'COMEDIES';
      }
      case 'Crime': {
        return 'CRIME';
      }
      case 'Documentary': {
        return 'DOCUMENTARY';
      }
      case 'Drama': {
        return 'DRAMAS';
      }
      case 'Horror': {
        return 'HORROR';
      }
      case 'Family': {
        return 'FAMILY';
      }
      case 'Romance': {
        return 'ROMANCE';
      }
      case 'Sci-Fi': {
        return 'SCI_FI';
      }
      case 'Thrillers': {
        return 'THRILLERS';
      }
      default: {
        return 'ALL_GENRES';
      }
    }
  }

  static toString (genre: GenreType): string {
    switch (genre) {
      case 'COMEDIES': {
        return 'Comedy';
      }
      case 'CRIME': {
        return 'Crime';
      }
      case 'DOCUMENTARY': {
        return 'Documentary';
      }
      case 'DRAMAS': {
        return 'Dramas';
      }
      case 'HORROR': {
        return 'Horror';
      }
      case 'FAMILY': {
        return 'Family';
      }
      case 'ROMANCE': {
        return 'Romance';
      }
      case 'SCI_FI': {
        return 'Sci-Fi';
      }
      case 'THRILLERS': {
        return 'Thrillers';
      }
      default: {
        return 'All genres';
      }
    }
  }
}

export const Genres: Record<GenreType, string> = {
  ALL_GENRES: 'All genres',
  COMEDIES: 'Comedy',
  CRIME: 'Crime',
  DOCUMENTARY: 'Documentary',
  DRAMAS: 'Drama',
  HORROR: 'Horror',
  FAMILY: 'Kids & Family',
  ROMANCE: 'Romance',
  SCI_FI: 'Sci-Fi',
  THRILLERS: 'Thrillers',
};

export default Genres;

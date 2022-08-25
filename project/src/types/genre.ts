export const genres = ['ALL_GENRES', 'COMEDIES', 'CRIME', 'DOCUMENTARY', 'DRAMAS', 'HORROR', 'ACTION', 'THRILLERS', 'ADVENTURE', 'FANTASY'] as const;

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
      case 'Action': {
        return 'ACTION';
      }
      case 'Thriller': {
        return 'THRILLERS';
      }
      case 'Adventure': {
        return 'ADVENTURE';
      }
      case 'Fantasy': {
        return 'FANTASY';
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
        return 'Drama';
      }
      case 'HORROR': {
        return 'Horror';
      }
      case 'ACTION': {
        return 'Action';
      }
      case 'THRILLERS': {
        return 'Thriller';
      }
      case 'ADVENTURE': {
        return 'Adventure';
      }
      case 'FANTASY': {
        return 'Fantasy';
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
  ACTION: 'Action',
  THRILLERS: 'Thriller',
  ADVENTURE: 'Adventure',
  FANTASY: 'Fantasy',
};

export default Genres;

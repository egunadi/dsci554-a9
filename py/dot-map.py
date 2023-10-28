import pandas as pd

def export_cities():
    cities_filepath = '../data/worldcities.csv'
    
    cities_df = pd.read_csv(cities_filepath, delimiter=',', encoding='utf-8')
    
    cities_df = cities_df[['city', 'lat', 'lng', 'country', 'iso3']] 

    cities_df = cities_df[cities_df['iso3'].isin(['JPN', 'IDN', 'CHN', 'KOR', 'SGP'])]
        
    cities_df.to_json('../data/cities.json', orient='records')

if __name__ == '__main__':
    export_cities()

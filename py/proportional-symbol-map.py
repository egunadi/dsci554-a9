import pandas as pd
import numpy as np

def export_population_2020_circles():
    population_filepath = '../data/population.original.csv'
    
    population_df = pd.read_csv(population_filepath, delimiter=',', encoding='utf-8')
    
    population_df_japan = population_df[(population_df['Country or Area'] == 'Japan') & 
                                        (population_df['Variant'] == 'Medium')]
    
    population_df_korea = population_df[(population_df['Country or Area'] == 'Republic of Korea') & 
                                        (population_df['Variant'] == 'Medium')]
    
    population_df_japan = population_df_japan[['Year(s)', 'Value']]
    population_df_japan = population_df_japan.rename(columns={'Value': 'Japan'})
    
    population_df_korea = population_df_korea[['Year(s)', 'Value']]
    population_df_korea = population_df_korea.rename(columns={'Value': 'Korea'})
    
    population_df = population_df_japan.merge(population_df_korea, on='Year(s)')
    population_df = population_df.rename(columns={'Year(s)': 'Year'})
    
    
    population_df_unpivot = pd.melt(population_df, id_vars='Year', value_vars=['Japan', 'Korea'])
    population_df_unpivot = population_df_unpivot.rename(columns={'variable': 'Country', 'value': 'Population'})
    
    circle_df = population_df_unpivot[population_df_unpivot['Year'].isin([2020])]
    
    circle_df['radius'] = np.sqrt(circle_df['Population']) / 10
    
    def latitude(country):
      return 36.2048 if country == 'Japan' else 35.9078
    
    circle_df['lat'] = circle_df['Country'].apply(latitude)
    
    def longitude(country):
      return 138.2529 if country == 'Japan' else 127.7669
    
    circle_df['lon'] = circle_df['Country'].apply(longitude)
    
    circle_df = circle_df[['Country', 'radius', 'lat', 'lon']]
    
    circle_df.to_json('../data/population_2020_circles.json', orient='records')

if __name__ == '__main__':
    export_population_2020_circles()

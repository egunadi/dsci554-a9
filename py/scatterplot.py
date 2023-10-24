import pandas as pd

def export_population():
    population_filepath = '../data/population.original.csv'
    
    population_df = pd.read_csv(population_filepath, delimiter=',', encoding='utf-8')
    
    population_df_japan = population_df[(population_df['Country or Area'] == 'Japan') & 
                                        (population_df['Variant'] == 'Medium')]
    
    population_df_korea = population_df[(population_df['Country or Area'] == 'Republic of Korea') & 
                                        (population_df['Variant'] == 'Medium')]
    
    population_df_indonesia = population_df[(population_df['Country or Area'] == 'Indonesia') & 
                                        (population_df['Variant'] == 'Medium')]

    population_df_china = population_df[(population_df['Country or Area'] == 'China') & 
                                        (population_df['Variant'] == 'Medium')]

    population_df_singapore = population_df[(population_df['Country or Area'] == 'Singapore') & 
                                        (population_df['Variant'] == 'Medium')]
    
    population_df_japan = population_df_japan[['Year(s)', 'Value']]
    population_df_japan = population_df_japan.rename(columns={'Value': 'Japan'})
    
    population_df_korea = population_df_korea[['Year(s)', 'Value']]
    population_df_korea = population_df_korea.rename(columns={'Value': 'Korea'})
    
    population_df_indonesia = population_df_indonesia[['Year(s)', 'Value']]
    population_df_indonesia = population_df_indonesia.rename(columns={'Value': 'Indonesia'})
    
    population_df_china = population_df_china[['Year(s)', 'Value']]
    population_df_china = population_df_china.rename(columns={'Value': 'China'})
    
    population_df_singapore = population_df_singapore[['Year(s)', 'Value']]
    population_df_singapore = population_df_singapore.rename(columns={'Value': 'Singapore'})
    
    population_df = population_df_japan \
                            .merge(population_df_korea, on='Year(s)') \
                            .merge(population_df_indonesia, on='Year(s)') \
                            .merge(population_df_china, on='Year(s)') \
                            .merge(population_df_singapore, on='Year(s)')
                            
    population_df = population_df.rename(columns={'Year(s)': 'Year'})
    
    population_df_unpivot = pd.melt(population_df, 
                                    id_vars='Year', 
                                    value_vars=['Japan', 'Korea', 'Indonesia', 'China', 'Singapore'])
    population_df_unpivot = population_df_unpivot.rename(columns={'variable': 'Country', 'value': 'Population'})
    
    population_df_unpivot = population_df_unpivot[(population_df_unpivot['Year'] >= 1970)
                                                    & (population_df_unpivot['Year'] <= 2020)]
    
    population_df_unpivot.to_json('../data/population.json', orient='records')

if __name__ == '__main__':
    export_population()

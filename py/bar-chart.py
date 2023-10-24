import pandas as pd

def export_gdp_per_capita():
    population_filepath = '../data/population.original.csv'
    gdp_filepath = '../data/gdp.original.csv'
    
    population_df = pd.read_csv(population_filepath, delimiter=',', encoding='utf-8')
    gdp_df = pd.read_csv(gdp_filepath, delimiter=',', encoding='utf-8')
    
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
    
    gdp_df_japan = gdp_df[(gdp_df['Country or Area'] == 'Japan') & 
                            (gdp_df['Item'] == 'Gross Domestic Product (GDP)')]
    
    gdp_df_korea = gdp_df[(gdp_df['Country or Area'] == 'Republic of Korea') & 
                            (gdp_df['Item'] == 'Gross Domestic Product (GDP)')]
    
    gdp_df_indonesia = gdp_df[(gdp_df['Country or Area'] == 'Indonesia') & 
                            (gdp_df['Item'] == 'Gross Domestic Product (GDP)')]
    
    gdp_df_china = gdp_df[(gdp_df['Country or Area'] == 'China (mainland)') & 
                            (gdp_df['Item'] == 'Gross Domestic Product (GDP)')]
    
    gdp_df_singapore = gdp_df[(gdp_df['Country or Area'] == 'Singapore') & 
                            (gdp_df['Item'] == 'Gross Domestic Product (GDP)')]
    
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
    
    gdp_df_japan = gdp_df_japan[['Year', 'Value']]
    gdp_df_japan = gdp_df_japan.rename(columns={'Value': 'Japan'})
    
    gdp_df_korea = gdp_df_korea[['Year', 'Value']]
    gdp_df_korea = gdp_df_korea.rename(columns={'Value': 'Korea'})
    
    gdp_df_indonesia = gdp_df_indonesia[['Year', 'Value']]
    gdp_df_indonesia = gdp_df_indonesia.rename(columns={'Value': 'Indonesia'})
        
    gdp_df_china = gdp_df_china[['Year', 'Value']]
    gdp_df_china = gdp_df_china.rename(columns={'Value': 'China'})
        
    gdp_df_singapore = gdp_df_singapore[['Year', 'Value']]
    gdp_df_singapore = gdp_df_singapore.rename(columns={'Value': 'Singapore'})
    
    gdp_df = gdp_df_japan \
                .merge(gdp_df_korea, on='Year') \
                .merge(gdp_df_indonesia, on='Year') \
                .merge(gdp_df_china, on='Year') \
                .merge(gdp_df_singapore, on='Year')
    
    population_df_unpivot = pd.melt(population_df, 
                                    id_vars='Year', 
                                    value_vars=['Japan', 'Korea', 'Indonesia', 'China', 'Singapore'])
    population_df_unpivot = population_df_unpivot.rename(columns={'variable': 'Country', 'value': 'Population'})
    
    gdp_df_unpivot = pd.melt(gdp_df, 
                             id_vars='Year', 
                             value_vars=['Japan', 'Korea', 'Indonesia', 'China', 'Singapore'])
    gdp_df_unpivot = gdp_df_unpivot.rename(columns={'variable': 'Country', 'value': 'GDP'})
    
    combined_df = population_df_unpivot.merge(gdp_df_unpivot, on=['Year','Country'])
    
    combined_df['GDP_per_Capita'] = combined_df['GDP'] / combined_df['Population']
    
    combined_df_simplified = combined_df[combined_df['Year'].isin([1970, 1980, 1990, 2000, 2010, 2020])]
    
    combined_df_simplified = combined_df_simplified[['Year', 'Country', 'GDP_per_Capita']]
    
    combined_df_simplified.to_json('../data/gdp_per_capita.json', orient='records')
    
if __name__ == '__main__':
    export_gdp_per_capita()

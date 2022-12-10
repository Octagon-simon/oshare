<?php
class DatabaseClass{    
    
        private $connection = null;

        // this function is called everytime this class is instantiated     
        public function __construct( $dbhost = DB_HOST, $dbname = DB_NAME, $username = DB_USER, $password = DB_PASS){

            try{
            
                $this->connection = new PDO("mysql:host={$dbhost};dbname={$dbname};", $username, $password);
                $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $this->connection->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
              //$this->connection->setAttribute(PDO::MYSQL_ATTR_FOUND_ROWS, true);
            }catch(Exception $e){
                throw new Exception($e->getMessage());   
            }           
            
        }
        
        // Insert a row/s in a Database Table
        public function Insert( $statement = "" , $parameters = [] ){
            try{
                
                $this->executeStatement( $statement , $parameters );
                return $this->connection->lastInsertId();
                
            }catch(Exception $e){
                throw new Exception($e->getMessage());   
            }       
        }

        // Select one row in a Database Table
        public function SelectOne( $statement = "" , $parameters = [] ){
            try{
                
                $stmt = $this->executeStatement( $statement , $parameters );
                return $stmt->fetch();
                
            }catch(Exception $e){
                throw new Exception($e->getMessage());   
            }       
        }

         // Select all rows in a Database Table
        public function SelectAll( $statement = "" , $parameters = [] ){
            try{
                
                $stmt = $this->executeStatement( $statement , $parameters );
                return $stmt->fetchAll();
                
            }catch(Exception $e){
                throw new Exception($e->getMessage());   
            }       
        }
        
        // Update a row/s in a Database Table
        public function Update( $statement = "" , $parameters = [] ){
            try{
                
                $stmt = $this->executeStatement( $statement , $parameters );
                return $stmt->rowCount();
                
            }catch(Exception $e){
                throw new Exception($e->getMessage());   
            }       
        }       
        
        // Remove a row/s in a Database Table
        public function Remove( $statement = "" , $parameters = [] ){
            try{
                
                $stmt = $this->executeStatement( $statement , $parameters );
                return $stmt->rowCount();
                
            }catch(Exception $e){
                throw new Exception($e->getMessage());   
            }       
        }       
        
        // execute statement
        public function executeStatement( $statement = "" , $parameters = [] ){
            try{
            
                $stmt = $this->connection->prepare($statement);
                $stmt->execute($parameters);
                return $stmt;
                
            }catch(Exception $e){
                throw new Exception($e->getMessage());   
            }       
        }
}
?>
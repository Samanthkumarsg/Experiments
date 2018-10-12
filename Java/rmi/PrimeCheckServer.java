import java.rmi.*;
import java.rmi.registry.*;

public class PrimeCheckServer{
    public static void main(String args[]){
        try {
            PrimeCheckInt im = new PrimeCheckImpl();
            Naming.rebind("prime",im);   
        } catch (Exception e) {
            //TODO: handle exception
            System.out.println(e);
        }
    }
}
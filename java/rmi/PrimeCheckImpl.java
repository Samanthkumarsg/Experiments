import java.rmi.*;
import java.rmi.server.*;
public class PrimeCheckImpl extends UnicastRemoteObject implements PrimeCheckInt{
    PrimeCheckImpl() throws RemoteException{
        super();
    }

    public boolean check(int a) throws RemoteException{
        for(int i = 2; i < a; i++){
            if(a % i == 0)
                return true;
        }
        return false;
    }

}
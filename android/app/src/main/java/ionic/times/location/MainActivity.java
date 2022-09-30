package ionic.times.location;
import android.os.Bundle; // required for onCreate parameter
import com.hemangkumar.capacitorgooglemaps.CapacitorGoogleMaps;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
      registerPlugin(CapacitorGoogleMaps.class);
    }
}

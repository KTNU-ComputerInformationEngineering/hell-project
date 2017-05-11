package com.cookandroid.myapplication;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import com.google.android.gms.common.api.GoogleApiClient;

public class LoginActivity extends Activity {
    private EditText edtEmail;
    private Button btnGo;
    private GoogleApiClient client;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.login);

        Button btn4 = (Button) findViewById(R.id.btn4);
        edtEmail = (EditText) findViewById(R.id.edtEmail);
        btnGo = (Button) findViewById(R.id.btnGo);
        btnGo.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getApplicationContext(), LoginActivity.class);
                // SINGLE_TOP : 이미 만들어진게 있으면 그걸 쓰고 없으면 만들어서 써라
                intent.setFlags(intent.FLAG_ACTIVITY_SINGLE_TOP);
                // 동시에 사용 가능
                //intent.setFlags(intent.FLAG_ACTIVITY_SINGLE_TOP || intent.FLAG_ACTIVITY_CLEAR_TOP);

                // intent를 보내면서 다음 액티비티로 부터 데이터를 받기 위해 식별번호(1000)을 준다.
                startActivityForResult(intent, 1000);
            }
        });


        btn4.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                finish();
            }
        });

    }
    public void onBuTtonClicked(View v) {

        Intent intent = new Intent(getApplicationContext(), finalActivity.class);
        startActivity(intent);
        finish();
    }
}


